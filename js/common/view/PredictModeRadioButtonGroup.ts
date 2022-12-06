// Copyright 2022, University of Colorado Boulder

/**
 * PredictModeRadioButtonGroup is the radio button group for turning predict mode on/off.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Text } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import calculusGrapher from '../../calculusGrapher.js';
import PredictModeEnabledProperty from '../model/PredictModeEnabledProperty.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

type SelfOptions = EmptySelfOptions;

export type PredictModeRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export default class PredictModeRadioButtonGroup extends RectangularRadioButtonGroup<boolean> {

  public constructor( predictModeEnabledProperty: PredictModeEnabledProperty,
                      providedOptions: PredictModeRadioButtonGroupOptions ) {

    const options = optionize<PredictModeRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {

      // RectangularRadioButtonGroupOptions
      orientation: 'horizontal',
      spacing: 5,
      radioButtonOptions: {
        baseColor: CalculusGrapherColors.panelFillProperty,
        xMargin: 10,
        yMargin: 10
      }
    }, providedOptions );

    const rectangularRadioButtonGroupItems: RectangularRadioButtonGroupItem<boolean>[] = [
      {
        value: false,
        createNode: tandem => new Text( 'f(x)' ),
        tandemName: `fx${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: true,
        createNode: tandem => new Text( 'Predict' ),
        tandemName: `predict${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      }
    ];

    super( predictModeEnabledProperty, rectangularRadioButtonGroupItems, options );
  }
}

calculusGrapher.register( 'PredictModeRadioButtonGroup', PredictModeRadioButtonGroup );
