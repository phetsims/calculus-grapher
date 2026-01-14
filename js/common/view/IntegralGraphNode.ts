// Copyright 2026, University of Colorado Boulder

/**
 * IntegralGraphNode is the view of the integral graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import GraphType from '../model/GraphType.js';
import IntegralCurve from '../model/IntegralCurve.js';
import GraphNode, { GraphNodeOptions } from './GraphNode.js';

type SelfOptions = EmptySelfOptions;

type IntegralGraphNodeOptions = SelfOptions & PickRequired<GraphNodeOptions, 'chartRectangleHeight' | 'tandem'>;

export default class IntegralGraphNode extends GraphNode {

  public constructor( integralCurve: IntegralCurve,
                      gridVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: IntegralGraphNodeOptions ) {

    const options = optionize<IntegralGraphNodeOptions, SelfOptions, GraphNodeOptions>()( {
      accessibleHeading: CalculusGrapherFluent.a11y.integralGraph.accessibleHeadingStringProperty,
      accessibleParagraph: CalculusGrapherFluent.a11y.integralGraph.accessibleParagraphStringProperty,
      eyeToggleButtonOptions: {
        accessibleName: CalculusGrapherFluent.a11y.eyeToggleButton.accessibleNameStringProperty,
        accessibleHelpText: CalculusGrapherFluent.a11y.eyeToggleButton.accessibleHelpTextStringProperty,
        accessibleContextResponseOn: CalculusGrapherFluent.a11y.eyeToggleButton.accessibleContextResponseOnStringProperty,
        accessibleContextResponseOff: CalculusGrapherFluent.a11y.eyeToggleButton.accessibleContextResponseOffStringProperty
      }
    }, providedOptions );

    super( GraphType.INTEGRAL, integralCurve, gridVisibleProperty, options );
  }
}

calculusGrapher.register( 'IntegralGraphNode', IntegralGraphNode );