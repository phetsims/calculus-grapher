// Copyright 2026, University of Colorado Boulder

/**
 * ExplorationToolDescriber is the base class that creates accessible responses that are common
 * to all exploration tools (aka "scrubbers").
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { toFixedNumber } from '../../../../../dot/js/util/toFixedNumber.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../../CalculusGrapherSymbols.js';
import AncillaryTool from '../../model/AncillaryTool.js';

export default abstract class ExplorationToolDescriber {

  private readonly tool: AncillaryTool;

  protected constructor( tool: AncillaryTool ) {
    this.tool = tool;
  }

  /**
   * Gets the accessible object response that describes the tool's x-coordinate and the values of interest at that x-coordinate.
   */
  public abstract getAccessibleObjectResponse(): string;

  /**
   * Gets the phrase that describes the tool's position along the horizontal axis.
   * The format of this phrase is shared by all Exploration Tools.
   */
  protected getXPhrase(): string {
    let xPhrase: string;
    const x = toFixedNumber( this.tool.xProperty.value, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS );
    if ( x === this.tool.xProperty.range.max ) {
      xPhrase = CalculusGrapherFluent.a11y.explorationTools.accessibleObjectResponse.xPhrase.max.format( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
        value: x
      } );
    }
    else if ( x === this.tool.xProperty.range.min ) {
      xPhrase = CalculusGrapherFluent.a11y.explorationTools.accessibleObjectResponse.xPhrase.min.format( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
        value: x
      } );
    }
    else {
      xPhrase = CalculusGrapherFluent.a11y.explorationTools.accessibleObjectResponse.xPhrase.other.format( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
        value: x
      } );
    }
    return xPhrase;
  }
}
