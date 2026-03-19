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
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CurveManipulationType from '../model/CurveManipulationType.js';
import CurveManipulationIconNode from './CurveManipulationIconNode.js';

// Consistent order of radio buttons for all screens. There was a better way to do this, but it was thwarted by
// changes to the PhET-iO API. See https://github.com/phetsims/calculus-grapher/issues/400
const RADIO_BUTTONS_ORDER = [
  CurveManipulationType.HILL, CurveManipulationType.PEDESTAL,
  CurveManipulationType.TRIANGLE, CurveManipulationType.PARABOLA,
  CurveManipulationType.SINUSOID, CurveManipulationType.FREEFORM,
  CurveManipulationType.TILT, CurveManipulationType.SHIFT
];

export default class CurveManipulationTypeRadioButtonGroup extends RectangularRadioButtonGroup<CurveManipulationType> {

  public constructor( curveManipulationModeProperty: Property<CurveManipulationType>,
                      curveManipulationStroke: TColor,
                      tandem: Tandem ) {

    const validModes = curveManipulationModeProperty.validValues!;
    affirm( validModes, 'validModes should be defined' );

    const items: RectangularRadioButtonGroupItem<CurveManipulationType>[] = [];
    RADIO_BUTTONS_ORDER.forEach( curveManipulationType => {
      if ( validModes.includes( curveManipulationType ) ) {
        items.push( {
          value: curveManipulationType,
          createNode: () => new CurveManipulationIconNode( curveManipulationType, curveManipulationStroke ),
          tandemName: `${curveManipulationType.tandemPrefix}RadioButton`,
          options: {
            accessibleName: curveManipulationType.accessibleNameProperty
          }
        } );
      }
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

      // RectangularRadioButtonGroup does not support grid layout. These options are a bit of a hack to implement
      // a 2x2 grid. Values were set empirically to make the vertical and horizontal spacing look the same.
      // See https://github.com/phetsims/calculus-grapher/issues/351 and https://github.com/phetsims/calculus-grapher/issues/401.
      orientation: 'horizontal',
      preferredWidth: 155,
      widthSizable: false,
      justify: 'center',
      spacing: 5,
      wrap: true,
      lineSpacing: 5
    };

    super( curveManipulationModeProperty, items, options );
  }
}
