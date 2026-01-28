// Copyright 2026, University of Colorado Boulder

/**
 * TangentScrubberDescriber creates accessible responses for the Tangent scrubber.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { toFixedNumber } from '../../../../../dot/js/util/toFixedNumber.js';
import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
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
   * Gets the accessible object response that describes the scrubber's position and what its vertical line intersects.
   */
  public getAccessibleObjectResponse(): string {
    return CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.pattern.format( {
      xPhrase: this.getXPhrase(),
      slopePhrase: this.getSlopePhrase(),
      derivativePhrase: this.getDerivativePhrase()
    } );
  }

  /**
   * Gets the phrase that describes the scrubber's position along the horizontal axis.
   */
  private getXPhrase(): string {
    return CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.phrases.xPhrase.format( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
      value: toFixedNumber( this.tangentScrubber.xProperty.value, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS )
    } );
  }

  /**
   * Gets the phrase that describes the slope of the line that is tangent to the primary curve.
   * Slope is described as zero, positive, negative, or hidden.
   */
  private getSlopePhrase(): string {
    let slopePhrase: string;
    if ( this.primaryCurveLayerVisibleProperty.value ) {
      affirm( !this.tangentScrubber.originalCurvePointProperty.value.isDiscontinuous, 'Tangent tool does not support discontinuities in primary curve.' );
      const slope = this.tangentScrubber.derivativeCurvePointProperty.value.y;
      if ( slope === 0 ) {
        // zero
        slopePhrase = CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.phrases.slopeZeroValueStringProperty.value;
      }
      else if ( slope > 0 ) {
        // positive
        slopePhrase = CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.phrases.slopePositiveValue.format( {
          absoluteValue: toFixedNumber( Math.abs( slope ), CalculusGrapherConstants.SLOPE_DESCRIPTION_DECIMALS )
        } );
      }
      else {
        // negative
        slopePhrase = CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.phrases.slopeNegativeValue.format( {
          absoluteValue: toFixedNumber( Math.abs( slope ), CalculusGrapherConstants.SLOPE_DESCRIPTION_DECIMALS )
        } );
      }
    }
    else {
      // hidden
      slopePhrase = CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.phrases.slopeHiddenStringProperty.value;
    }
    return slopePhrase;
  }

  /**
   * Gets the phrase that describes the scrubber's intersection with the derivative graph.
   * The derivative is described as a y-value or hidden.
   */
  private getDerivativePhrase(): string {
    let derivativePhrase: string;
    if ( this.derivativeCurveLayerVisibleProperty.value ) {
      // y-value
      const point = this.tangentScrubber.derivativeCurvePointProperty.value;
      affirm( !point.isDiscontinuous, 'Tangent tool does not support discontinuities in derivative curve.' );
      derivativePhrase = CalculusGrapherFluent.a11y.referenceLineTool.accessibleObjectResponse.phrases.derivativeValue.format( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
        value: toFixedNumber( point.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS )
      } );
    }
    else {
      // hidden
      derivativePhrase = CalculusGrapherFluent.a11y.referenceLineTool.accessibleObjectResponse.phrases.derivativeHiddenStringProperty.value;
    }
    return derivativePhrase;
  }
}

calculusGrapher.register( 'TangentScrubberDescriber', TangentScrubberDescriber );