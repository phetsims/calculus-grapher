// Copyright 2026, University of Colorado Boulder

/**
 * IntegralGraphNode is the view of the integral graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import GraphSet from '../model/GraphSet.js';
import GraphType from '../model/GraphType.js';
import IntegralCurve from '../model/IntegralCurve.js';
import IntegralGraphAccessibleListNode from './description/IntegralGraphAccessibleListNode.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';

type SelfOptions = EmptySelfOptions;

type IntegralGraphNodeOptions = SelfOptions & PickRequired<GraphNodeOptions, 'chartRectangleHeight' | 'tandem'>;

export default class IntegralGraphNode extends GraphNode {

  // For core description.
  public readonly integralCurveVisibleProperty: TReadOnlyProperty<boolean>;

  public constructor( integralCurve: IntegralCurve,
                      gridVisibleProperty: TReadOnlyProperty<boolean>,
                      graphSetProperty: TReadOnlyProperty<GraphSet>,
                      providedOptions: IntegralGraphNodeOptions ) {

    const options = optionize<IntegralGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {
      accessibleHeading: CalculusGrapherFluent.a11y.integralGraphArea.accessibleHeadingStringProperty,
      eyeToggleButtonOptions: {
        accessibleNameOn: CalculusGrapherFluent.a11y.eyeToggleButton.accessibleNameOn.integralStringProperty,
        accessibleNameOff: CalculusGrapherFluent.a11y.eyeToggleButton.accessibleNameOff.integralStringProperty
      },
      yZoomButtonGroupOptions: {
        zoomInButtonOptions: {
          accessibleName: CalculusGrapherFluent.a11y.yZoomButtonGroup.zoomInButton.accessibleName.integralStringProperty
        },
        zoomOutButtonOptions: {
          accessibleName: CalculusGrapherFluent.a11y.yZoomButtonGroup.zoomOutButton.accessibleName.integralStringProperty
        }
      }
    }, providedOptions );

    super( GraphType.INTEGRAL, integralCurve, gridVisibleProperty, options );

    this.integralCurveVisibleProperty = new DerivedProperty(
      [ graphSetProperty, this.curveLayerVisibleProperty ],
      ( graphSet, curveLayerVisible ) => graphSet.includes( GraphType.INTEGRAL ) && curveLayerVisible );

    // Add AccessibleListNode to describe the graph.
    const accessibleListNode = new IntegralGraphAccessibleListNode( this.integralCurveVisibleProperty, gridVisibleProperty );
    this.addChild( accessibleListNode );

    // Focus order.
    affirm( this.yZoomButtonGroup, 'IntegralGraphNode requires a yZoomButtonGroup.' );
    this.pdomOrder = [
      accessibleListNode,
      this.yZoomButtonGroup,
      this.eyeToggleButton
    ];
  }
}

calculusGrapher.register( 'IntegralGraphNode', IntegralGraphNode );