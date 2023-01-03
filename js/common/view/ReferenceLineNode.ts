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
import optionize from '../../../../phet-core/js/optionize.js';
import { DragListener, Line, LineOptions, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import AncillaryTool from '../model/AncillaryTool.js';

type SelfOptions = {
  lineOptions?: LineOptions;
  sphereOptions?: ShadedSphereNodeOptions;
  sphereDiameter?: number;
};

type ReferenceLineNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class ReferenceLineNode extends Node {

  private readonly verticalLine;
  private readonly shadedSphereNode;

  public constructor( ancillaryTool: AncillaryTool,
                      chartTransform: ChartTransform,
                      providedOptions?: ReferenceLineNodeOptions ) {

    const options = optionize<ReferenceLineNodeOptions, SelfOptions, NodeOptions>()( {
      lineOptions: {
        stroke: 'black'
      },
      sphereOptions: { mainColor: 'blue' },
      sphereDiameter: 18
    }, providedOptions );

    const xProperty = ancillaryTool.xProperty;

    // values will be updated later
    const verticalLine = new Line( 0, 0, 0, -1, options.lineOptions );

    // add numerical label at the top of the vertical line
    const labelNode = new NumberDisplay( xProperty,
      CalculusGrapherConstants.CURVE_X_RANGE, {
        align: 'center',
        decimalPlaces: 1,
        textOptions: {
          font: CalculusGrapherConstants.CONTROL_FONT
        },
        visibleProperty: CalculusGrapherPreferences.valuesVisibleProperty,
        bottom: verticalLine.top - 5,
        centerX: 0
      } );

    const shadedSphereNode = new ShadedSphereNode( options.sphereDiameter, options.sphereOptions );

    const cursorNode = new Node( {
      children: [ verticalLine, shadedSphereNode, labelNode ],
      x: chartTransform.modelToViewX( xProperty.value )
    } );

    // add dragListener
    shadedSphereNode.addInputListener( new DragListener( {
      drag( event, listener ) {

        // current modelPosition
        const modelX = chartTransform.viewToModelX( listener.modelPoint.x );
        xProperty.value = chartTransform.modelXRange.constrainValue( modelX );
      },
      tandem: options.tandem.createTandem( 'dragListener' )
    } ) );

    xProperty.link( x => {

      cursorNode.centerX = chartTransform.modelToViewX( x );
    } );

    options.children = [ cursorNode ];
    super( options );

    this.verticalLine = verticalLine;
    this.shadedSphereNode = shadedSphereNode;

    this.addLinkedElement( ancillaryTool, {
      tandem: options.tandem.createTandem( ancillaryTool.tandem.name )
    } );
  }

  /**
   * Returns an icon for a ReferenceLine
   */
  public static getIcon( providedOptions?: ReferenceLineNodeOptions ): Node {

    const options = optionize<ReferenceLineNodeOptions, SelfOptions, NodeOptions>()( {
      lineOptions: {
        stroke: 'black',
        y2: -15
      },
      sphereOptions: { mainColor: 'blue' },
      sphereDiameter: 8
    }, providedOptions );

    const shadedSphereNode = new ShadedSphereNode( options.sphereDiameter, options.sphereOptions );

    const verticalLine = new Line( options.lineOptions );

    options.children = [ verticalLine, shadedSphereNode ];

    return new Node( options );
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

}
calculusGrapher.register( 'ReferenceLineNode', ReferenceLineNode );
