/**
 * Leak Sensor.
 *
 * UI element representing a Leak Sensor.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const Thing = require('./thing');

class LeakSensor extends Thing {
  /**
   * LeakSensor Constructor (extends Thing).
   *
   * @param {Object} description Thing description object.
   * @param {Number} format See Constants.ThingFormat
   */
  constructor(model, description, format) {
    super(
      model,
      description,
      format,
      {
        baseIcon: '/optimized-images/thing-icons/leak_sensor.svg',
      }
    );
  }

  /**
   * Find any properties required for this view.
   */
  findProperties() {
    this.leakProperty = null;

    // Look for properties by type first.
    for (const name in this.displayedProperties) {
      const type = this.displayedProperties[name].property['@type'];

      if (type === 'LeakProperty') {
        this.leakProperty = name;
        break;
      }
    }
  }

  get icon() {
    return this.element.querySelector('webthing-leak-sensor-capability');
  }

  /**
   * Update the display for the provided property.
   * @param {string} name - name of the property
   * @param {*} value - value of the property
   */
  updateProperty(name, value) {
    super.updateProperty(name, value);

    if (!this.displayedProperties.hasOwnProperty(name)) {
      return;
    }

    if (name === this.leakProperty) {
      this.icon.leak = !!value;
    }
  }

  iconView() {
    return `
      <webthing-leak-sensor-capability>
      </webthing-leak-sensor-capability>`;
  }

  riskView() {
    let currentRiskValue = 0;
    console.log(this);
    if (this.model.properties.on)
      currentRiskValue = 1;
    let currentRiskClass = `risk-low`;
    if (currentRiskValue <= 6 && currentRiskValue > 3) {
      currentRiskClass = `risk-med`;
    }else if (currentRiskValue > 6) {
      currentRiskClass = `risk-high`;
    }
    return `
    <button class="rounded ${currentRiskClass}" >Risk Score: ${currentRiskValue}</button>
    `
  }
}

module.exports = LeakSensor;
