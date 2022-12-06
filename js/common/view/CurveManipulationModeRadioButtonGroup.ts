// Copyright 2022, University of Colorado Boulder

/**
 * CurveManipulationModeRadioButtonGroup is the radio button group for choosing a curve manipulation model
 *
 * @author Martin Veillette (Berea College)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import CurveManipulationMode from '../model/CurveManipulationMode.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import calculusGrapher from '../../calculusGrapher.js';
import CurveManipulationIconNode from './CurveManipulationIconNode.js';
import PredictModeEnabledProperty from '../model/PredictModeEnabledProperty.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

type SelfOptions = EmptySelfOptions;

export type CurveManipulationModeRadioButtonGroupOptions = SelfOptions & RectangularRadioButtonGroupOptions;

export default class CurveManipulationModeRadioButtonGroup extends RectangularRadioButtonGroup<CurveManipulationMode> {

  public constructor( curveManipulationModeProperty: Property<CurveManipulationMode>,
                      predictModeEnabledProperty: PredictModeEnabledProperty,
                      providedOptions: CurveManipulationModeRadioButtonGroupOptions ) {

    const options = optionize<CurveManipulationModeRadioButtonGroupOptions, SelfOptions, RectangularRadioButtonGroupOptions>()( {

      // RectangularRadioButtonGroupOptions
      spacing: 3,
      radioButtonOptions: {
        baseColor: CalculusGrapherColors.panelFillProperty
      }
    }, providedOptions );

    const validModes = curveManipulationModeProperty.validValues!;
    assert && assert( validModes );

    const rectangularRadioButtonGroupItems: RectangularRadioButtonGroupItem<CurveManipulationMode>[] =
      CurveManipulationMode.enumeration.values.map(
        mode => {
          return {
            value: mode,
            createNode: tandem => new CurveManipulationIconNode( mode, {
              stroke: predictModeEnabledProperty.colorStrokeProperty
            } ),
            options: {
              visible: validModes.includes( mode )
            },
            tandemName: `${mode.tandemPrefix}${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
          };
        }
      );

    super( curveManipulationModeProperty, rectangularRadioButtonGroupItems, options );
  }
}

calculusGrapher.register( 'CurveManipulationModeRadioButtonGroup', CurveManipulationModeRadioButtonGroup );
