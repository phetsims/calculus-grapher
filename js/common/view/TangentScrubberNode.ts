// Copyright 2023-2026, University of Colorado Boulder

/**
 * TangentScrubberNode is a subclass of ScrubberNode that sets the appropriate colors for the scrubber.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ChartTransform from '../../../../bamboo/js/ChartTransform.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../CalculusGrapherSymbols.js';
import TangentScrubber from '../model/TangentScrubber.js';
import ScrubberNode, { ScrubberNodeOptions } from './ScrubberNode.js';

type SelfOptions = EmptySelfOptions;

export type TangentScrubberNodeOptions = SelfOptions &
  PickRequired<ScrubberNodeOptions, 'lineTop' | 'lineBottom' | 'tandem' | 'visibleProperty'>;

export default class TangentScrubberNode extends ScrubberNode {

  private readonly tangentScrubber: TangentScrubber;

  public constructor( tangentScrubber: TangentScrubber,
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
  }

  public override doAccessibleObjectResponse(): void {

    const derivativeValue = toFixedNumber( this.tangentScrubber.derivativeCurvePointProperty.value.y, CalculusGrapherConstants.SLOPE_DESCRIPTION_DECIMALS );

    this.addAccessibleObjectResponse( CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.format( {
      sign: derivativeValue === 0 ? 'zero' : derivativeValue > 0 ? 'positive' : 'negative',
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
      x: toFixedNumber( this.tangentScrubber.xProperty.value, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS ),
      absoluteDerivativeValue: Math.abs( derivativeValue ),
      derivativeValue: derivativeValue
    } ) );
  }

  /**
   * Creates an icon for the tangent scrubber.
   */
  public static override createIcon(): Node {
    return ScrubberNode.createIcon( CalculusGrapherColors.derivativeCurveStrokeProperty );
  }
}

calculusGrapher.register( 'TangentScrubberNode', TangentScrubberNode );