// Copyright 2026, University of Colorado Boulder

/**
 * SecondDerivativeGraphNode is the view of the derivative graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import GraphType from '../model/GraphType.js';
import SecondDerivativeCurve from '../model/SecondDerivativeCurve.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';

type SelfOptions = EmptySelfOptions;

type SecondDerivativeGraphNodeOptions = SelfOptions & PickRequired<GraphNodeOptions, 'chartRectangleHeight' | 'tandem'>;

export default class SecondDerivativeGraphNode extends GraphNode {

  public constructor( secondDerivativeCurve: SecondDerivativeCurve,
                      gridVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: SecondDerivativeGraphNodeOptions ) {

    const options = optionize<SecondDerivativeGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {
      accessibleHeading: CalculusGrapherFluent.a11y.secondDerivativeGraphArea.accessibleHeadingStringProperty,
      accessibleParagraph: CalculusGrapherFluent.a11y.secondDerivativeGraphArea.accessibleParagraphStringProperty,
      eyeToggleButtonOptions: {
        accessibleNameOn: CalculusGrapherFluent.a11y.eyeToggleButton.accessibleNameOn.secondDerivativeStringProperty,
        accessibleNameOff: CalculusGrapherFluent.a11y.eyeToggleButton.accessibleNameOff.secondDerivativeStringProperty
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
  }
}

calculusGrapher.register( 'SecondDerivativeGraphNode', SecondDerivativeGraphNode );