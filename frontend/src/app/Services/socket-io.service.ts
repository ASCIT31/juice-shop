/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { environment } from 'src/environments/environment'
import { Injectable, NgZone, inject } from '@angular/core'
import { io, type Socket } from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private readonly ngZone = inject(NgZone)

  private _socket: Socket

  constructor () {
    this.ngZone.runOutsideAngular(() => {
      if (environment.hostServer === '.') {
        this._socket = io(window.location.origin, {
          path: (window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/') + 'socket.io',
          auth: (cb) => { cb({ token: localStorage.getItem('token') }) }
        })
      } else {
        this._socket = io(environment.hostServer, {
          auth: (cb) => { cb({ token: localStorage.getItem('token') }) }
        })
      }
      // The server rejects connections without a session token; retry once the user has logged in.
      this._socket.on('connect_error', () => { if (!this._socket.active) this.retryWhenAuthenticated() })
    })
  }

  private retryWhenAuthenticated () {
    setTimeout(() => {
      if (this._socket.connected) return
      if (localStorage.getItem('token')) {
        this._socket.connect()
      } else {
        this.retryWhenAuthenticated()
      }
    }, 5000)
  }

  socket () {
    return this._socket
  }
}
