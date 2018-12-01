/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the elements needed by this element.
import './counter-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView2 extends PageViewElement {
  render() {
    return html`
      ${SharedStyles}
      <section>
        <h2>State container example: simple counter</h2>
        <div class="circle">${this._value}</div>
        <p>This page contains a reusable <code>&lt;counter-element&gt;</code>.
        When the element updates its counter, this page updates its values,
        and you can see the current value of the counter reflected in
        the bubble above.</p>
        <br><br>
      </section>
      <section>
        <p>
          <counter-element value="${this._value}" clicks="${this._clicks}" doubleIncrement="${this._doubleIncrement}"
              @counter-incremented="${this._increment}"
              @counter-decremented="${this._decrement}"
              @counter-reset="${this._counterReset}"
              @counter-double-increment="${this._counterDoubleIncrement}">
          </counter-element>
        </p>
      </section>
    `;
  }

  static get properties() { return {
    // This is the data from the store.
    _clicks: { type: Number },
    _value: { type: Number },
    _doubleIncrement: { type: Boolean },
  }}

  constructor() {
    super();
    this._clicks = 0;
    this._value = 0;
    this._doubleIncrement = false;
  }

  _incrementAmount() {
    return this._doubleIncrement ? 2 : 1;
  }

  _increment() {
    this._clicks++;
    this._value = this._value + this._incrementAmount();
  }

  _decrement() {
    this._clicks++;
    this._value = this._value - this._incrementAmount();
  }

  _counterReset() {
    this._clicks = 0;
    this._value = 0;
  }

  _counterDoubleIncrement(event) {
    let checked = event.detail;
    this._doubleIncrement = checked;
  }
}

window.customElements.define('my-view2', MyView2);
