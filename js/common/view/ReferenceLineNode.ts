// Copyright 2023, University of Colorado Boulder

/**
 * ReferenceLineNode is the view representation of a vertical reference line
 * The reference line is composed of a vertical line, a shadedSphere and
 * a label that indicates the numerical value of its x- position (atop the vertical line)
 * The label is only visible if valuesVisibleProperty in the preferences is set to true
 * The shadedSphere is user controlled.
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Line, Node, VBox } from '../../../../scenery/js/imports.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import ReferenceLine from '../model/ReferenceLine.js';
import LineToolNode, { LineToolNodeOptions } from './LineToolNode.js';
import Multilink from '../../../../axon/js/Multilink.js';
import XDragHandleNode from './XDragHandleNode.js';

type SelfOptions = EmptySelfOptions;

type ReferenceLineNodeOptions = SelfOptions & PickRequired<LineToolNodeOptions, 'tandem'>;

export default class ReferenceLineNode extends LineToolNode {

  public constructor( referenceLine: ReferenceLine,
                      chartTransform: ChartTransform,
                      providedOptions: ReferenceLineNodeOptions ) {

    const options = optionize<ReferenceLineNodeOptions, SelfOptions, LineToolNodeOptions>()( {

      // NodeOptions
      visibleProperty: referenceLine.visibleProperty
    }, providedOptions );

    super( referenceLine.xProperty, chartTransform, CalculusGrapherColors.referenceLineStrokeProperty, options );

    // add numerical label at the top of the vertical line
    const labelNode = new NumberDisplay( referenceLine.xProperty,
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
        centerX: 0
      } );
    this.addChild( labelNode );

    // drag handle, for translating x
    const dragHandle = new XDragHandleNode( referenceLine.xProperty, chartTransform, {
      yModel: chartTransform.modelYRange.min,
      mainColor: CalculusGrapherColors.referenceLineHandleColorProperty,
      tandem: options.tandem.createTandem( 'dragHandle' )
    } );
    this.addChild( dragHandle );

    // Reposition the label and drag handle
    Multilink.multilink( [ this.line.boundsProperty, labelNode.boundsProperty ], () => {
      labelNode.centerBottom = this.line.centerTop;
      dragHandle.top = this.line.bottom; // x position is the responsibility of dragHandle
    } );

    this.addLinkedElement( referenceLine, {
      tandem: options.tandem.createTandem( referenceLine.tandem.name )
    } );
  }

  /**
   * Returns an icon for a ReferenceLine
   */
  public static getIcon(): Node {

    const verticalLine = new Line( 0, 0, 0, 11, {
      stroke: CalculusGrapherColors.referenceLineStrokeProperty
    } );

    const dragHandle = new ShadedSphereNode( 8, {
      mainColor: CalculusGrapherColors.referenceLineHandleColorProperty
    } );

    return new VBox( {
      children: [ verticalLine, dragHandle ]
    } );
  }
}
calculusGrapher.register( 'ReferenceLineNode', ReferenceLineNode );
