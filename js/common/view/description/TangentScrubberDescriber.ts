// Copyright 2026, University of Colorado Boulder

/**
 * TangentScrubberDescriber creates accessible responses for the tangent scrubber.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { toFixedNumber } from '../../../../../dot/js/util/toFixedNumber.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../../CalculusGrapherSymbols.js';
import TangentScrubber from '../../model/TangentScrubber.js';

export default class TangentScrubberDescriber {

  public constructor( private readonly tangentScrubber: TangentScrubber,
                      private readonly primaryCurveLayerVisibleProperty: TReadOnlyProperty<boolean>,
                      private readonly derivativeCurveLayerVisibleProperty: TReadOnlyProperty<boolean>
  ) {
    // All fields are defined and initialized via constructor params.
  }

  /**
   * Gets the accessible object response that describes the tangent scrubber and what it intersects.
   */
  public getAccessibleObjectResponse(): string {

    const derivativeValue = toFixedNumber( this.tangentScrubber.derivativeCurvePointProperty.value.y, CalculusGrapherConstants.SLOPE_DESCRIPTION_DECIMALS );

    return CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.format( {
      sign: derivativeValue === 0 ? 'zero' : derivativeValue > 0 ? 'positive' : 'negative',
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
      x: toFixedNumber( this.tangentScrubber.xProperty.value, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS ),
      absoluteDerivativeValue: Math.abs( derivativeValue ),
      derivativeValue: derivativeValue
    } );
  }
}

calculusGrapher.register( 'TangentScrubberDescriber', TangentScrubberDescriber );