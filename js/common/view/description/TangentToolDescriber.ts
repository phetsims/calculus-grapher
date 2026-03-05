// Copyright 2026, University of Colorado Boulder

/**
 * TangentToolDescriber creates accessible responses for the Tangent Tool.
 *
 * In code and PhET-iO API, this is referred to as a "scrubber".  But "tool" is used here
 * to align with core-description terminology.
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
import ExplorationToolDescriber from './ExplorationToolDescriber.js';

export default class TangentToolDescriber extends ExplorationToolDescriber {

  public constructor( private readonly tangentScrubber: TangentScrubber,
                      private readonly primaryCurveLayerVisibleProperty: TReadOnlyProperty<boolean>,
                      private readonly derivativeCurveLayerVisibleProperty: TReadOnlyProperty<boolean>
  ) {
    // All fields are defined and initialized via constructor params.
    super( tangentScrubber );
  }

  /**
   * Gets the accessible object response that describes the tool's x-coordinate and what its vertical line intersects.
   */
  public override getAccessibleObjectResponse(): string {
    return CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.pattern.format( {
      xPhrase: this.getXPhrase(),
      slopePhrase: this.getSlopePhrase(),
      derivativePhrase: this.getDerivativePhrase()
    } );
  }

  /**
   * Gets the phrase that describes the slope of the line that is tangent to the primary curve.
   * Slope is described as zero, positive, negative, or hidden.
   */
  private getSlopePhrase(): string {
    let slopePhrase: string;
    if ( this.primaryCurveLayerVisibleProperty.value ) {
      affirm( !this.tangentScrubber.primaryCurvePointProperty.value.isDiscontinuous, 'Tangent tool does not support discontinuities in primary curve.' );
      const slope = toFixedNumber( this.tangentScrubber.derivativeCurvePointProperty.value.y, CalculusGrapherConstants.SLOPE_DESCRIPTION_DECIMALS );
      if ( slope === 0 ) {
        // zero
        slopePhrase = CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.slopePhrase.zeroStringProperty.value;
      }
      else if ( slope > 0 ) {
        // positive
        slopePhrase = CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.slopePhrase.positive.format( {
          absoluteSlope: Math.abs( slope )
        } );
      }
      else {
        // negative
        slopePhrase = CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.slopePhrase.negative.format( {
          absoluteSlope: Math.abs( slope )
        } );
      }
    }
    else {
      // hidden
      slopePhrase = CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.slopePhrase.hiddenStringProperty.value;
    }
    return slopePhrase;
  }

  /**
   * Gets the phrase that describes the tool's intersection with the derivative graph.
   * The derivative is described as a y-value or hidden.
   */
  private getDerivativePhrase(): string {
    let derivativePhrase: string;
    if ( this.derivativeCurveLayerVisibleProperty.value ) {
      // y-value
      const point = this.tangentScrubber.derivativeCurvePointProperty.value;
      affirm( !point.isDiscontinuous, 'Tangent tool does not support discontinuities in derivative curve.' );
      derivativePhrase = CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.derivativePhrase.derivativeValue.format( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
        value: toFixedNumber( point.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS )
      } );
    }
    else {
      // hidden
      derivativePhrase = CalculusGrapherFluent.a11y.tangentTool.accessibleObjectResponse.derivativePhrase.hiddenStringProperty.value;
    }
    return derivativePhrase;
  }
}

calculusGrapher.register( 'TangentToolDescriber', TangentToolDescriber );