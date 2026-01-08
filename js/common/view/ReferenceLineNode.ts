// Copyright 2023-2025, University of Colorado Boulder

/**
 * ReferenceLineNode is a subclass of ScrubberNode that sets the appropriate colors for the scrubber and adds
 * Ôa numerical label at the top of the vertical line. The label is only visible if valuesVisibleProperty in
 * Preferences is set to true
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import ReferenceLine from '../model/ReferenceLine.js';
import ScrubberNode from './ScrubberNode.js';

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
      phetioHandleNodeVisiblePropertyInstrumented: false,

      handleAccessibleNameProperty: CalculusGrapherFluent.a11y.referenceLineScrubber.accessibleNameStringProperty,
      handleAccessibleHelpTextProperty: CalculusGrapherFluent.a11y.referenceLineScrubber.accessibleHelpText.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } )
    } );

    // See https://github.com/phetsims/calculus-grapher/issues/305
    const xDisplayProperty = new DerivedProperty( [ referenceLine.xProperty ],
      x => roundToInterval( x, Math.pow( 10, -X_DECIMAL_PLACES ) ), {
        tandem: tandem.createTandem( 'xDisplayProperty' ),
        phetioValueType: NumberIO
      } );

    // Create and add a numerical label at the top of the vertical line
    const numberDisplay = new NumberDisplay( xDisplayProperty,
      CalculusGrapherConstants.CURVE_X_RANGE, {
        align: 'center',
        decimalPlaces: X_DECIMAL_PLACES,
        valuePattern: new DerivedProperty( [ CalculusGrapherSymbols.visualVariableSymbolProperty ], variable => `${variable} = {{value}}` ),
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

  public override doAccessibleObjectResponse(): void {
    this.addAccessibleObjectResponse( 'ReferenceLineNode object response' );
  }

  /**
   * Creates an icon for the reference line.
   */
  public static override createIcon(): Node {
    return ScrubberNode.createIcon( CalculusGrapherColors.referenceLineHandleColorProperty, CalculusGrapherColors.referenceLineStrokeProperty );
  }
}
calculusGrapher.register( 'ReferenceLineNode', ReferenceLineNode );