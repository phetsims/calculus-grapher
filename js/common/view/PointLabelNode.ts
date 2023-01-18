// Copyright 2022-2023, University of Colorado Boulder

/**
 * PointLabelNode is a point on originalCurve, with a label. The point is a scenery/Circle
 * The label updates its positions, and is set perpendicular to the tangent of the curve
 *
 * @author Martin Veillette
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import calculusGrapher from '../../calculusGrapher.js';
import PlottedPoint from './PlottedPoint.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { getDerivativeOf, GraphType } from '../model/GraphType.js';
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Multilink from '../../../../axon/js/Multilink.js';
import PointLabel from '../model/PointLabel.js';

type SelfOptions = EmptySelfOptions;

type PointLabelNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class PointLabelNode extends Node {

  public constructor( pointLabel: PointLabel,
                      graphType: GraphType,
                      chartTransform: ChartTransform,
                      predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                      providedOptions: PointLabelNodeOptions ) {

    const options = optionize<PointLabelNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      visibleProperty: new DerivedProperty(
        [ pointLabel.visibleProperty, predictModeEnabledProperty ],
        ( pointLabelVisible, predictMode ) => pointLabelVisible && !predictMode, {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } )
    }, providedOptions );

    // property associated with y value
    const yProperty = pointLabel.getYProperty( graphType );

    // property associated with the tangent at the y value
    const yDerivativeProperty = pointLabel.getYProperty( getDerivativeOf( graphType ) );

    // small point (disk) on curve - focusCircle is responsible for updating its position
    const focusCircle = new PlottedPoint( pointLabel.xProperty, yProperty, chartTransform, {
      fill: pointLabel.pointColorProperty
    } );

    // label for the point
    const text = new Text( pointLabel.labelProperty, {
      font: CalculusGrapherConstants.POINT_LABEL_FONT,
      maxWidth: 50
    } );

    const labelNode = new BackgroundNode( text, {
      rectangleOptions: {
        cornerRadius: 3
      }
    } );

    // update the positions of the line and label Node
    // use some heuristic algorithm to prevent the label to overlap with the curve
    const updatePosition = () => {

      const tangent = yDerivativeProperty.value;
      const modelPerpendicularTangent = Math.atan( tangent ) + Math.PI / 2;

      const distance = ( labelNode.height / 2 ) + ( focusCircle.height / 2 ) + 1;

      // vector perpendicular to the tangent in view (hence the minus sign for the angle, since y is inverted)
      const perpendicularDisplacement = Vector2.createPolar( distance, -modelPerpendicularTangent );

      // position the label node perpendicular to the curve
      labelNode.center = focusCircle.center.plus( perpendicularDisplacement );
    };

    Multilink.multilink( [ pointLabel.xProperty, yProperty, pointLabel.labelProperty ], () => updatePosition() );

    options.children = [ focusCircle, labelNode ];

    super( options );

    this.addLinkedElement( pointLabel, {
      tandem: options.tandem.createTandem( pointLabel.tandem.name )
    } );
  }
}
calculusGrapher.register( 'PointLabelNode', PointLabelNode );
