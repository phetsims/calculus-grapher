// Copyright 2023, University of Colorado Boulder

/**
 * ReferenceLineNode is the view representation of a vertical reference line
 * The reference line is composed of a vertical line, a XDragHandler and
 * a label that indicates the numerical value of its x- position (atop the vertical line)
 * The label is only visible if valuesVisibleProperty in the preferences is set to true
 * The shadedSphere (in XDragHandler) is user controlled.
 *
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import calculusGrapher from '../../calculusGrapher.js';
import { Line, Node, VBox } from '../../../../scenery/js/imports.js';
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
import XDragHandleNode from './XDragHandleNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class ReferenceLineNode extends ScrubberNode {

  public constructor( referenceLine: ReferenceLine,
                      chartTransform: ChartTransform,
                      tandem: Tandem ) {

    super( referenceLine, chartTransform, {
      handleColor: CalculusGrapherColors.referenceLineHandleColorProperty,
      lineStroke: CalculusGrapherColors.referenceLineStrokeProperty,
      lineDash: [],

      // This is a hack to keep referenceLineNode.visibleProperty from showing up in Studio.
      visibleProperty: new DerivedProperty( [ referenceLine.visibleProperty ], visible => visible ),
      tandem: tandem
    } );

    // Create and add a numerical label at the top of the vertical line
    const numberDisplay = new NumberDisplay( referenceLine.xProperty,
      CalculusGrapherConstants.CURVE_X_RANGE, {
        align: 'center',
        decimalPlaces: 1,
        valuePattern: new DerivedProperty(
          [ CalculusGrapherPreferences.functionVariableProperty, CalculusGrapherSymbols.xStringProperty, CalculusGrapherSymbols.tStringProperty ],
          ( functionVariable, xString, tString ) => {
            const variableString = ( functionVariable === 'x' ) ? xString : tString;
            return `${variableString} = {{value}}`;
          } ),
        useRichText: true,
        textOptions: {
          font: CalculusGrapherConstants.CONTROL_FONT
        },
        visibleProperty: CalculusGrapherPreferences.valuesVisibleProperty,
        bottom: this.line.top - 5,
        centerX: 0,
        pickable: false // optimization, see https://github.com/phetsims/calculus-grapher/issues/210
      } );
    this.addChild( numberDisplay );

    // Keep the numberDisplay centered at the top of the line.
    Multilink.multilink( [ this.line.boundsProperty, numberDisplay.boundsProperty ], () => {
      numberDisplay.centerBottom = this.line.centerTop;
    } );
  }

  /**
   * Returns an icon for a ReferenceLine
   */
  public static createIcon(): Node {

    const line = new Line( 0, 0, 0, 11, {
      stroke: CalculusGrapherColors.referenceLineStrokeProperty
    } );

    const dragHandleIcon = XDragHandleNode.createIcon( CalculusGrapherColors.referenceLineHandleColorProperty );

    return new VBox( {
      children: [ line, dragHandleIcon ]
    } );
  }
}
calculusGrapher.register( 'ReferenceLineNode', ReferenceLineNode );
