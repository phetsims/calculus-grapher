// Copyright 2022-2026, University of Colorado Boulder

/**
 * CurveManipulationTypeRadioButtonGroup is the radio button group for choosing a curve manipulation model.
 * The buttons are arranged in a 2-column grid. Hiding buttons via PhET-iO will automatically cause the
 * layout to update so that there are no 'holes' in the grid.
 *
 * @author Martin Veillette (Berea College)
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem, RectangularRadioButtonGroupOptions } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CurveManipulationType from '../model/CurveManipulationType.js';
import CurveManipulationIconNode from './CurveManipulationIconNode.js';

export default class CurveManipulationTypeRadioButtonGroup extends RectangularRadioButtonGroup<CurveManipulationType> {

  public constructor( curveManipulationModeProperty: Property<CurveManipulationType>,
                      curveManipulationStroke: TColor,
                      tandem: Tandem ) {

    const validModes = curveManipulationModeProperty.validValues!;
    affirm( validModes, 'validModes should be defined' );

    const items: RectangularRadioButtonGroupItem<CurveManipulationType>[] = validModes.map( mode => {
      return {
        value: mode,
        createNode: () => new CurveManipulationIconNode( mode, curveManipulationStroke ),
        tandemName: `${mode.tandemPrefix}RadioButton`,
        options: {
          accessibleName: mode.accessibleNameProperty,
          accessibleHelpText: mode.radioButtonAccessibleHelpTextProperty
        }
      };
    } );

    const options: RectangularRadioButtonGroupOptions = {
      isDisposable: false,
      radioButtonOptions: {
        baseColor: CalculusGrapherColors.panelFillProperty,
        xMargin: 9,
        yMargin: 6,
        buttonAppearanceStrategyOptions: {
          selectedLineWidth: 2
        }
      },
      accessibleName: CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.accessibleNameStringProperty,
      accessibleHelpText: CalculusGrapherFluent.a11y.curveManipulationTypeRadioButtonGroup.accessibleHelpTextStringProperty,
      tandem: tandem,

      // These options are a bit of a hack to implement a 2x2 grid.
      // Values were set empirically to make the vertical and horizontal spacing look the same.
      // See https://github.com/phetsims/calculus-grapher/issues/351.
      orientation: 'horizontal',
      preferredWidth: 148,
      widthSizable: false,
      wrap: true,
      spacing: 0,
      lineSpacing: 4
    };

    super( curveManipulationModeProperty, items, options );
  }
}

calculusGrapher.register( 'CurveManipulationTypeRadioButtonGroup', CurveManipulationTypeRadioButtonGroup );