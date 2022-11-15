// Copyright 2022, University of Colorado Boulder

/**
 * ValuesControl is the control in the Preferences dialog for setting whether numerical values are displayed
 * throughout the simulations. It is a labeled on/off switch.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { HBox, HBoxOptions, Text, TextOptions } from '../../../../scenery/js/imports.js';
import OnOffSwitch from '../../../../sun/js/OnOffSwitch.js';
import calculusGrapher from '../../calculusGrapher.js';

type SelfOptions = {
  textOptions?: StrictOmit<TextOptions, 'tandem'>;
};

type ValuesControlOptions = SelfOptions & PickRequired<HBoxOptions, 'tandem'>;

export default class ValuesControl extends HBox {
  public constructor( valuesVisibleProperty: Property<boolean>, providedOptions: ValuesControlOptions ) {

    const options = optionize<ValuesControlOptions, StrictOmit<SelfOptions, 'textOptions'>, HBoxOptions>()( {

      // HBoxOptions
      spacing: 15
    }, providedOptions );

    const labelText = new Text( 'Values:', combineOptions<TextOptions>( {
      tandem: options.tandem.createTandem( 'labelText' )
    }, options.textOptions ) );

    const onOffSwitch = new OnOffSwitch( valuesVisibleProperty, {
      tandem: options.tandem.createTandem( 'onOffSwitch' )
    } );

    options.children = [ labelText, onOffSwitch ];

    super( options );
  }
}

calculusGrapher.register( 'ValuesControl', ValuesControl );