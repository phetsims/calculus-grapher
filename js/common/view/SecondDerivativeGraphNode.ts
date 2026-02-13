// Copyright 2026, University of Colorado Boulder

/**
 * SecondDerivativeGraphNode is the view of the derivative graph.
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
import SecondDerivativeCurve from '../model/SecondDerivativeCurve.js';
import SecondDerivativeGraphAccessibleListNode from './description/SecondDerivativeGraphAccessibleListNode.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';

type SelfOptions = EmptySelfOptions;

type SecondDerivativeGraphNodeOptions = SelfOptions & PickRequired<GraphNodeOptions, 'chartRectangleHeight' | 'tandem'>;

export default class SecondDerivativeGraphNode extends GraphNode {

  // For core description.
  public readonly secondDerivativeCurveVisibleProperty: TReadOnlyProperty<boolean>;

  public constructor( secondDerivativeCurve: SecondDerivativeCurve,
                      gridVisibleProperty: TReadOnlyProperty<boolean>,
                      graphSetProperty: TReadOnlyProperty<GraphSet>,
                      providedOptions: SecondDerivativeGraphNodeOptions ) {

    const options = optionize<SecondDerivativeGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {
      accessibleHeading: CalculusGrapherFluent.a11y.graphArea.secondDerivative.accessibleHeadingStringProperty,
      curveVisibilityToggleButtonOptions: {
        accessibleNameOn: CalculusGrapherFluent.a11y.curveVisibilityToggleButton.accessibleNameOn.secondDerivativeStringProperty,
        accessibleNameOff: CalculusGrapherFluent.a11y.curveVisibilityToggleButton.accessibleNameOff.secondDerivativeStringProperty
      },
      yZoomButtonGroupOptions: {
        zoomInButtonOptions: {
          accessibleName: CalculusGrapherFluent.a11y.yZoomButtonGroup.zoomInButton.accessibleName.secondDerivativeStringProperty
        },
        zoomOutButtonOptions: {
          accessibleName: CalculusGrapherFluent.a11y.yZoomButtonGroup.zoomOutButton.accessibleName.secondDerivativeStringProperty
        }
      }
    }, providedOptions );

    super( GraphType.SECOND_DERIVATIVE, secondDerivativeCurve, gridVisibleProperty, options );

    this.secondDerivativeCurveVisibleProperty = new DerivedProperty(
      [ graphSetProperty, this.curveLayerVisibleProperty ],
      ( graphSet, curveLayerVisible ) => graphSet.includes( GraphType.SECOND_DERIVATIVE ) && curveLayerVisible );

    // Add AccessibleListNode to describe the graph.
    const accessibleListNode = new SecondDerivativeGraphAccessibleListNode( secondDerivativeCurve, this.secondDerivativeCurveVisibleProperty, gridVisibleProperty );
    this.addChild( accessibleListNode );

    affirm( this.yZoomButtonGroup, 'SecondDerivativeGraphNode requires a yZoomButtonGroup.' );
    this.pdomOrder = [
      accessibleListNode,
      this.yZoomButtonGroup,
      this.curveVisibilityToggleButton
    ];
  }
}

calculusGrapher.register( 'SecondDerivativeGraphNode', SecondDerivativeGraphNode );