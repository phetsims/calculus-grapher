// Copyright 2026, University of Colorado Boulder

/**
 * DerivativeGraphNode is the view of the derivative graph.
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
import DerivativeCurve from '../model/DerivativeCurve.js';
import GraphSet from '../model/GraphSet.js';
import GraphType from '../model/GraphType.js';
import DerivativeGraphAccessibleListNode from './description/DerivativeGraphAccessibleListNode.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';

type SelfOptions = EmptySelfOptions;

type DerivativeGraphNodeOptions = SelfOptions & PickRequired<GraphNodeOptions, 'chartRectangleHeight' | 'tandem'>;

export default class DerivativeGraphNode extends GraphNode {

  // For core description.
  public readonly derivativeCurveVisibleProperty: TReadOnlyProperty<boolean>;

  public constructor( derivativeCurve: DerivativeCurve,
                      gridVisibleProperty: TReadOnlyProperty<boolean>,
                      graphSetProperty: TReadOnlyProperty<GraphSet>,
                      providedOptions: DerivativeGraphNodeOptions ) {

    const options = optionize<DerivativeGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {
      accessibleHeading: CalculusGrapherFluent.a11y.graphArea.derivative.accessibleHeadingStringProperty,
      eyeToggleButtonOptions: {
        accessibleNameOn: CalculusGrapherFluent.a11y.eyeToggleButton.accessibleNameOn.derivativeStringProperty,
        accessibleNameOff: CalculusGrapherFluent.a11y.eyeToggleButton.accessibleNameOff.derivativeStringProperty
      },
      yZoomButtonGroupOptions: {
        zoomInButtonOptions: {
          accessibleName: CalculusGrapherFluent.a11y.yZoomButtonGroup.zoomInButton.accessibleName.derivativeStringProperty
        },
        zoomOutButtonOptions: {
          accessibleName: CalculusGrapherFluent.a11y.yZoomButtonGroup.zoomOutButton.accessibleName.derivativeStringProperty
        }
      }
    }, providedOptions );

    super( GraphType.DERIVATIVE, derivativeCurve, gridVisibleProperty, options );

    this.derivativeCurveVisibleProperty = new DerivedProperty(
      [ graphSetProperty, this.curveLayerVisibleProperty ],
      ( graphSet, curveLayerVisible ) => graphSet.includes( GraphType.DERIVATIVE ) && curveLayerVisible );

    // Add AccessibleListNode to describe the graph.
    const accessibleListNode = new DerivativeGraphAccessibleListNode( derivativeCurve, this.derivativeCurveVisibleProperty, gridVisibleProperty );
    this.addChild( accessibleListNode );

    // Focus order.
    affirm( this.yZoomButtonGroup, 'DerivativeGraphNode requires a yZoomButtonGroup.' );
    this.pdomOrder = [
      accessibleListNode,
      this.yZoomButtonGroup,
      this.eyeToggleButton
    ];
  }
}

calculusGrapher.register( 'DerivativeGraphNode', DerivativeGraphNode );