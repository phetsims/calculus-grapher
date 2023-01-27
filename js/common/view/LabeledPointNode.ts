// Copyright 2022-2023, University of Colorado Boulder

/**
 * LabeledPointNode is a point on originalCurve, with a label. The point is a scenery/Circle
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
import BackgroundNode from '../../../../scenery-phet/js/BackgroundNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Multilink from '../../../../axon/js/Multilink.js';
import LabeledPoint from '../model/LabeledPoint.js';

type SelfOptions = EmptySelfOptions;

type LabeledPointNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class LabeledPointNode extends Node {

  public constructor( labeledPoint: LabeledPoint,
                      chartTransform: ChartTransform,
                      predictModeEnabledProperty: TReadOnlyProperty<boolean>,
                      curveLayerVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: LabeledPointNodeOptions ) {

    const options = optionize<LabeledPointNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      visibleProperty: new DerivedProperty(
        [ curveLayerVisibleProperty, labeledPoint.visibleProperty, predictModeEnabledProperty ],
        ( curveLayerVisible, labeledPointVisible, predictMode ) => curveLayerVisible && labeledPointVisible && !predictMode, {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } )
    }, providedOptions );

    // point that is plotted on the curve
    const plottedPoint = new PlottedPoint( labeledPoint.xProperty, labeledPoint.yOriginalProperty, chartTransform, {
      fill: labeledPoint.pointColorProperty
    } );

    // label for the point
    const text = new Text( labeledPoint.labelProperty, {
      font: CalculusGrapherConstants.POINT_LABEL_FONT,
      maxWidth: 50,
      tandem: options.tandem.createTandem( 'text' )
    } );

    const labelNode = new BackgroundNode( text, {
      rectangleOptions: {
        cornerRadius: 3
      }
    } );

    // update the positions of the label Node
    // we use some heuristic algorithm to prevent the label to overlap with the curve
    const updateLabelPosition = () => {

      // value of the tangent (slope) at the y point
      const tangent = labeledPoint.yDerivativeProperty.value;

      // angle (with respect to x-axis) associated with the normal vector to the tangent
      const modelPerpendicularTangent = Math.atan( tangent ) + Math.PI / 2;

      // determine a distance between the label and plottedPoint (center to center) - put them as close as possible
      const distance = ( labelNode.height / 2 ) + ( plottedPoint.height / 2 ) + 1;

      // vector perpendicular to the tangent in view (hence the minus sign for the angle, since y is inverted)
      const perpendicularDisplacement = Vector2.createPolar( distance, -modelPerpendicularTangent );

      // position the label node perpendicular to the curve
      labelNode.center = plottedPoint.center.plus( perpendicularDisplacement );
    };

    Multilink.multilink( [ plottedPoint.boundsProperty, labeledPoint.yDerivativeProperty, labeledPoint.labelProperty ],
      () => updateLabelPosition() );

    options.children = [ plottedPoint, labelNode ];

    super( options );

    this.addLinkedElement( labeledPoint, {
      tandem: options.tandem.createTandem( labeledPoint.tandem.name )
    } );
  }
}
calculusGrapher.register( 'LabeledPointNode', LabeledPointNode );
