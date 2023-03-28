// Copyright 2023, University of Colorado Boulder

/**
 * ReferenceLineNode is the view representation of a vertical reference line
 * The reference line is composed of a vertical line, a XDragHandler and
 * a label that indicates the numerical value of its x- position (atop the vertical line)
 * The label is only visible if valuesVisibleProperty in the preferences is set to true
 * The shadedSphere (in XDragHandler) is user-controlled.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import { Node } from '../../../../scenery/js/imports.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import ReferenceLine from '../model/ReferenceLine.js';
import ScrubberNode from './ScrubberNode.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Utils from '../../../../dot/js/Utils.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';

// number of decimal places shown for the x value, dragging snaps to this interval
const X_DECIMAL_PLACES = 1;

export default class ReferenceLineNode extends ScrubberNode {

  public constructor( referenceLine: ReferenceLine,
                      chartTransform: ChartTransform,
                      tandem: Tandem ) {

    super( referenceLine, chartTransform, {
      handleColor: referenceLine.handleColorProperty,
      lineStroke: referenceLine.lineColorProperty,
      lineDash: [], // solid line

      // This is a hack to keep referenceLineNode.visibleProperty from linking to referenceLine.visibleProperty in Studio.
      visibleProperty: new DerivedProperty( [ referenceLine.visibleProperty ], visible => visible ),
      tandem: tandem,

      // See https://github.com/phetsims/calculus-grapher/issues/281#issuecomment-1472217525
      phetioHandleNodeVisiblePropertyInstrumented: false
    } );

    // See https://github.com/phetsims/calculus-grapher/issues/305
    const xDisplayProperty = new DerivedProperty( [ referenceLine.xProperty ],
      x => Utils.roundToInterval( x, Math.pow( 10, -X_DECIMAL_PLACES ) ), {
        tandem: tandem.createTandem( 'xDisplayProperty' ),
        phetioValueType: NumberIO
      } );

    // Create and add a numerical label at the top of the vertical line
    const numberDisplay = new NumberDisplay( xDisplayProperty,
      CalculusGrapherConstants.CURVE_X_RANGE, {
        align: 'center',
        decimalPlaces: X_DECIMAL_PLACES,
        valuePattern: new DerivedProperty(
          [ CalculusGrapherPreferences.functionVariableProperty, CalculusGrapherSymbols.xStringProperty, CalculusGrapherSymbols.tStringProperty ],
          ( functionVariable, xString, tString ) => {
            const variableString = ( functionVariable === 'x' ) ? xString : tString;
            return `${variableString} = {{value}}`;
          } ),
        useRichText: true,
        textOptions: {
          font: CalculusGrapherConstants.CONTROL_FONT,
          maxWidth: 60 // see https://github.com/phetsims/calculus-grapher/issues/304
        },
        visibleProperty: CalculusGrapherPreferences.valuesVisibleProperty,
        bottom: this.line.top - 5,
        centerX: 0,
        pickable: false // optimization, see https://github.com/phetsims/calculus-grapher/issues/210
        // No PhET-iO instrumentation, see https://github.com/phetsims/calculus-grapher/issues/305
      } );
    this.addChild( numberDisplay );

    // Keep the numberDisplay centered at the top of the line.
    Multilink.multilink( [ this.line.boundsProperty, numberDisplay.boundsProperty ], () => {
      numberDisplay.centerBottom = this.line.centerTop;
    } );
  }

  /**
   * Creates an icon for the reference line.
   */
  public static override createIcon(): Node {
    return ScrubberNode.createIcon( CalculusGrapherColors.referenceLineHandleColorProperty, CalculusGrapherColors.referenceLineStrokeProperty );
  }
}
calculusGrapher.register( 'ReferenceLineNode', ReferenceLineNode );
