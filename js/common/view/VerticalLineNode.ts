// Copyright 2022, University of Colorado Boulder

/**
 * VerticalLineNode is the view representation of a user controlled vertical line that spans multiple graphs.
 *
 * @author Martin Veillette
 */

import calculusGrapher from '../../calculusGrapher.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { DragListener, Line, LineOptions, Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import CalculusGrapherPreferences from '../model/CalculusGrapherPreferences.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import NumberDisplay from '../../../../scenery-phet/js/NumberDisplay.js';
import AncillaryTools from '../model/AncillaryTools.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Panel from '../../../../sun/js/Panel.js';

type SelfOptions = {
  lineOptions?: LineOptions;
  sphereOptions?: ShadedSphereNodeOptions;
  sphereDiameter?: number;
  labelProperty?: StringProperty | null;

  dragListenerEnabled?: boolean;
};

type SelfReferenceLineIconOptions = StrictOmit<SelfOptions, 'labelProperty' | 'dragListenerEnabled'>;
type ReferenceLineIconOptions = SelfReferenceLineIconOptions & StrictOmit<NodeOptions, 'children'>;

type VerticalLineNodeOptions = SelfOptions & StrictOmit<NodeOptions, 'children'>;

export default class VerticalLineNode extends Node {

  private readonly verticalLine;
  private readonly sphere;

  public constructor( ancillaryTools: AncillaryTools,
                      chartTransform: ChartTransform,
                      providedOptions?: VerticalLineNodeOptions ) {

    const options = optionize<VerticalLineNodeOptions, SelfOptions, NodeOptions>()( {
      lineOptions: {
        stroke: 'black'
      },
      sphereOptions: { mainColor: 'blue' },
      sphereDiameter: 18,
      labelProperty: null,
      dragListenerEnabled: true
    }, providedOptions );

    const xCoordinateProperty = ancillaryTools.xCoordinateProperty;

    const sphere = new ShadedSphereNode( options.sphereDiameter, options.sphereOptions );

    // values will be updated later
    const verticalLine = new Line( 0, 0, 0, -1, options.lineOptions );

    let labelNode: Node;
    if ( options.labelProperty ) {


      const textNode = new Text( options.labelProperty, {
        font: CalculusGrapherConstants.CONTROL_FONT,
        centerX: 0
      } );

      labelNode = new Panel( textNode, {
        centerX: 0,
        align: 'center',
        bottom: verticalLine.top - 5
      } );

      options.labelProperty.link( () => {
        labelNode.centerX = 0;
      } );
    }
    else {
      // add numerical label at the top of the vertical line
      labelNode = new NumberDisplay( xCoordinateProperty,
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
    }
    const cursorNode = new Node( {
      children: [ verticalLine, sphere, labelNode ],
      centerX: chartTransform.modelToViewX( xCoordinateProperty.value )
    } );

    // add dragListener
    cursorNode.addInputListener( new DragListener( {
      drag( event, listener ) {

        // current modelPosition
        const modelX = chartTransform.viewToModelX( listener.modelPoint.x );
        xCoordinateProperty.value = chartTransform.modelXRange.constrainValue( modelX );
      },
      enabled: options.dragListenerEnabled,
      tandem: options.dragListenerEnabled ? options.tandem.createTandem( 'dragListener' ) : Tandem.OPT_OUT
    } ) );

    xCoordinateProperty.link( xCoordinate => {

      cursorNode.centerX = chartTransform.modelToViewX( xCoordinate );
    } );

    options.children = [ cursorNode ];
    super( options );

    this.verticalLine = verticalLine;
    this.sphere = sphere;

    const model = options.tandem.createTandem( 'model' );

    // add linked elements from model
    this.addLinkedElement( ancillaryTools.xCoordinateProperty, {
      tandem: model.createTandem( 'xCoordinateProperty' )
    } );

    this.addLinkedElement( ancillaryTools.areaUnderCurveProperty, {
      tandem: model.createTandem( 'integralProperty' )
    } );

    this.addLinkedElement( ancillaryTools.originalProperty, {
      tandem: model.createTandem( 'functionProperty' )
    } );

    this.addLinkedElement( ancillaryTools.tangentProperty, {
      tandem: model.createTandem( 'derivativeProperty' )
    } );

    this.addLinkedElement( ancillaryTools.curvatureProperty, {
      tandem: model.createTandem( 'secondDerivativeProperty' )
    } );
  }

  // set Y top position in view coordinates
  public setLineTop( value: number ): void {
    this.verticalLine.setY2( value );
  }

  // set Y bottom position of line in view coordinates
  public setLineBottom( value: number ): void {
    this.verticalLine.setY1( value );
    this.sphere.setCenterY( value );
  }

  /**
   * Returns an icon for a ReferenceLine
   */
  public static getIcon( providedOptions?: ReferenceLineIconOptions ): Node {

    const options = optionize<ReferenceLineIconOptions, SelfReferenceLineIconOptions, NodeOptions>()( {
      lineOptions: {
        stroke: 'black',
        y2: -15
      },
      sphereOptions: { mainColor: 'blue' },
      sphereDiameter: 8
    }, providedOptions );

    const sphere = new ShadedSphereNode( options.sphereDiameter, options.sphereOptions );

    const verticalLine = new Line( options.lineOptions );

    options.children = [ verticalLine, sphere ];

    return new Node( options );
  }
}

calculusGrapher.register( 'VerticalLineNode', VerticalLineNode );
