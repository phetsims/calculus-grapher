// Copyright 2023, University of Colorado Boulder

/**
 * ShowOriginalCurveCheckbox is the checkbox labeled 'Show f(x)' that appears in the upper-right corner
 * of the original graph when the 'Predict' radio button is selected.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherStrings from '../../CalculusGrapherStrings.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import GraphTypeLabelNode from './GraphTypeLabelNode.js';
import GraphType from '../model/GraphType.js';
import { HBox, Text } from '../../../../scenery/js/imports.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type ShowOriginalCurveCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem' | 'visibleProperty'>;

export default class ShowOriginalCurveCheckbox extends Checkbox {

  public constructor( showOriginalCurveProperty: Property<boolean>, providedOptions: ShowOriginalCurveCheckboxOptions ) {

    const options = optionize<ShowOriginalCurveCheckboxOptions, SelfOptions, CheckboxOptions>()( {

      // CheckboxOptions
      boxWidth: CalculusGrapherConstants.CHECKBOX_WIDTH
    }, providedOptions );

    const content = new HBox( {
      children: [
        new Text( CalculusGrapherStrings.showStringProperty, {
          font: CalculusGrapherConstants.CONTROL_FONT,
          maxWidth: 100,
          tandem: options.tandem.createTandem( 'text' )
        } ),
        new GraphTypeLabelNode( GraphType.ORIGINAL )
      ],
      spacing: 5
    } );

    super( showOriginalCurveProperty, content, options );
  }
}

calculusGrapher.register( 'ShowOriginalCurveCheckbox', ShowOriginalCurveCheckbox );
