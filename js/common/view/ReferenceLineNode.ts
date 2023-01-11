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
import { DragListener, Line, Node, NodeOptions, NodeTranslationOptions } from '../../../../scenery/js/imports.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import AncillaryTool from '../model/AncillaryTool.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';

type SelfOptions = EmptySelfOptions;

type ReferenceLineNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class ReferenceLineNode extends Node {

  private readonly verticalLine;
  private readonly shadedSphereNode;

  public constructor( referenceLine: AncillaryTool,
                      chartTransform: ChartTransform,
                      providedOptions: ReferenceLineNodeOptions ) {

    const options = optionize<ReferenceLineNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      visibleProperty: referenceLine.visibleProperty,
      cursor: 'pointer'
    }, providedOptions );

    const xProperty = referenceLine.xProperty;

    // values will be updated later
    const verticalLine = new Line( 0, 0, 0, -1, {
      stroke: CalculusGrapherColors.referenceLineStrokeProperty
    } );

    // add numerical label at the top of the vertical line
    const labelNode = new NumberDisplay( xProperty,
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
        bottom: verticalLine.top - 5,
        centerX: 0
      } );

    const shadedSphereNode = new ShadedSphereNode( 18, {
      mainColor: CalculusGrapherColors.referenceLineHandleColorProperty
    } );

    const parentNode = new Node( {
      children: [ verticalLine, shadedSphereNode, labelNode ],
      x: chartTransform.modelToViewX( xProperty.value )
    } );

    // add dragListener
    parentNode.addInputListener( new DragListener( {
      drag( event, listener ) {

        // current modelPosition
        const modelX = chartTransform.viewToModelX( listener.modelPoint.x );
        xProperty.value = chartTransform.modelXRange.constrainValue( modelX );
      },
      tandem: options.tandem.createTandem( 'dragListener' )
    } ) );

    xProperty.link( x => {
      parentNode.centerX = chartTransform.modelToViewX( x );
    } );

    //TODO https://github.com/phetsims/calculus-grapher/issues/151 why do we need a Node with 1 child?
    options.children = [ parentNode ];
    super( options );

    this.verticalLine = verticalLine;
    this.shadedSphereNode = shadedSphereNode;

    this.addLinkedElement( referenceLine, {
      tandem: options.tandem.createTandem( referenceLine.tandem.name )
    } );
  }

  // set Y top position in view coordinates
  public setLineTop( value: number ): void {
    this.verticalLine.setY2( value );
  }

  // set Y bottom position of line in view coordinates
  public setLineBottom( value: number ): void {
    this.verticalLine.setY1( value );
    this.shadedSphereNode.setCenterY( value );
  }

  /**
   * Returns an icon for a ReferenceLine
   */
  public static getIcon(): Node {

    const shadedSphereNode = new ShadedSphereNode( 8, {
      mainColor: CalculusGrapherColors.referenceLineHandleColorProperty
    } );

    const verticalLine = new Line( {
      stroke: CalculusGrapherColors.referenceLineStrokeProperty,
      y2: -15
    } );

    return new Node( {
      children: [ verticalLine, shadedSphereNode ]
    } );
  }
}
calculusGrapher.register( 'ReferenceLineNode', ReferenceLineNode );
