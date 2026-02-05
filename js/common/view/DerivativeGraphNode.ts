// Copyright 2026, University of Colorado Boulder

/**
 * DerivativeGraphNode is the view of the derivative graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import DerivativeCurve from '../model/DerivativeCurve.js';
import GraphType from '../model/GraphType.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';

type SelfOptions = EmptySelfOptions;

type DerivativeGraphNodeOptions = SelfOptions & PickRequired<GraphNodeOptions, 'chartRectangleHeight' | 'tandem'>;

export default class DerivativeGraphNode extends GraphNode {

  public constructor( derivativeCurve: DerivativeCurve,
                      gridVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: DerivativeGraphNodeOptions ) {

    const options = optionize<DerivativeGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {
      accessibleHeading: CalculusGrapherFluent.a11y.derivativeGraphArea.accessibleHeadingStringProperty,
      accessibleParagraph: CalculusGrapherFluent.a11y.derivativeGraphArea.accessibleParagraphStringProperty,
      eyeToggleButtonOptions: {
        accessibleName: CalculusGrapherFluent.a11y.eyeToggleButton.accessibleNameOn.derivativeStringProperty
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
  }
}

calculusGrapher.register( 'DerivativeGraphNode', DerivativeGraphNode );