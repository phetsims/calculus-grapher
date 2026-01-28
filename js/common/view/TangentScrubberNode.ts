// Copyright 2023-2026, University of Colorado Boulder

/**
 * TangentScrubberNode is a subclass of ScrubberNode that sets the appropriate colors for the scrubber.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import TangentScrubber from '../model/TangentScrubber.js';
import TangentScrubberDescriber from './description/TangentScrubberDescriber.js';
import ScrubberNode, { ScrubberNodeOptions } from './ScrubberNode.js';

type SelfOptions = EmptySelfOptions;

export type TangentScrubberNodeOptions = SelfOptions &
  PickRequired<ScrubberNodeOptions, 'lineTop' | 'lineBottom' | 'tandem' | 'visibleProperty'>;

export default class TangentScrubberNode extends ScrubberNode {

  private readonly tangentScrubber: TangentScrubber;
  private readonly describer: TangentScrubberDescriber;

  public constructor( tangentScrubber: TangentScrubber,
                      describer: TangentScrubberDescriber,
                      chartTransform: ChartTransform,
                      providedOptions: TangentScrubberNodeOptions ) {

    const options = optionize<TangentScrubberNodeOptions, SelfOptions, ScrubberNodeOptions>()( {

      // ScrubberNodeOptions
      handleColor: tangentScrubber.colorProperty,
      lineStroke: tangentScrubber.colorProperty,
      handleAccessibleNameProperty: CalculusGrapherFluent.a11y.tangentTool.accessibleNameStringProperty,
      handleAccessibleHelpTextProperty: CalculusGrapherFluent.a11y.tangentTool.accessibleHelpText.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } )
    }, providedOptions );

    super( tangentScrubber, chartTransform, options );

    this.tangentScrubber = tangentScrubber;
    this.describer = describer;
  }

  /**
   * Adds an accessible object response that describes the tangent scrubber and what it intersects.
   */
  public override doAccessibleObjectResponse(): void {
    this.addAccessibleObjectResponse( this.describer.getAccessibleObjectResponse() );
  }

  /**
   * Creates an icon for the tangent scrubber.
   */
  public static override createIcon(): Node {
    return ScrubberNode.createIcon( CalculusGrapherColors.derivativeCurveStrokeProperty );
  }
}

calculusGrapher.register( 'TangentScrubberNode', TangentScrubberNode );