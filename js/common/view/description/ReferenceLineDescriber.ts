// Copyright 2026, University of Colorado Boulder

/**
 * ReferenceLineDescriber creates accessible responses for the Reference Line.
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
import GraphSet from '../../model/GraphSet.js';
import GraphType from '../../model/GraphType.js';
import ReferenceLine from '../../model/ReferenceLine.js';

const ACCESSIBLE_STRINGS = CalculusGrapherFluent.a11y.referenceLine.accessibleObjectResponse;

export default class ReferenceLineDescriber {

  public constructor( private readonly referenceLine: ReferenceLine,
                      private readonly graphSetProperty: TReadOnlyProperty<GraphSet>,
                      private readonly predictEnabledProperty: TReadOnlyProperty<boolean>,
                      private readonly showOriginalCurveProperty: TReadOnlyProperty<boolean>,
                      private readonly primaryCurveLayerVisibleProperty: TReadOnlyProperty<boolean>,
                      private readonly integralCurveLayerVisibleProperty: TReadOnlyProperty<boolean>,
                      private readonly derivativeCurveLayerVisibleProperty: TReadOnlyProperty<boolean>,
                      private readonly secondDerivativeCurveLayerVisibleProperty: TReadOnlyProperty<boolean>
  ) {
    // All fields are defined and initialized via constructor params.
  }

  /**
   * Gets the accessible object response that describes the scrubber's position and what its vertical line intersects.
   */
  public getAccessibleObjectResponse(): string {

    let response: string;
    const graphSet = this.graphSetProperty.value;

    if ( graphSet.matches( [ GraphType.ORIGINAL, GraphType.DERIVATIVE ] ) ) {
      response = ACCESSIBLE_STRINGS.patterns.primaryDerivative.format( {
        xPhrase: this.getXPhrase(),
        primaryPhrase: this.getPrimaryPhrase(),
        derivativePhrase: this.getDerivativePhrase()
      } );
    }
    else if ( graphSet.matches( [ GraphType.INTEGRAL, GraphType.ORIGINAL ] ) ) {
      response = ACCESSIBLE_STRINGS.patterns.integralPrimary.format( {
        xPhrase: this.getXPhrase(),
        integralPhrase: this.getIntegralPhrase(),
        primaryPhrase: this.getPrimaryPhrase()
      } );
    }
    else if ( graphSet.matches( [ GraphType.INTEGRAL, GraphType.ORIGINAL, GraphType.DERIVATIVE ] ) ) {
      response = ACCESSIBLE_STRINGS.patterns.integralPrimaryDerivative.format( {
        xPhrase: this.getXPhrase(),
        integralPhrase: this.getIntegralPhrase(),
        primaryPhrase: this.getPrimaryPhrase(),
        derivativePhrase: this.getDerivativePhrase()
      } );
    }
    else {
      affirm( graphSet.matches( [ GraphType.ORIGINAL, GraphType.DERIVATIVE, GraphType.SECOND_DERIVATIVE ] ) );
      response = ACCESSIBLE_STRINGS.patterns.primaryDerivativeSecondDerivative.format( {
        xPhrase: this.getXPhrase(),
        primaryPhrase: this.getPrimaryPhrase(),
        derivativePhrase: this.getDerivativePhrase(),
        secondDerivativePhrase: this.getSecondDerivativePhrase()
      } );
    }

    return response;
  }

  /**
   * Gets the phrase that describes the scrubber's position along the horizontal axis.
   */
  private getXPhrase(): string {
    return ACCESSIBLE_STRINGS.xPhrase.format( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
      value: toFixedNumber( this.referenceLine.xProperty.value, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS )
    } );
  }

  /**
   * Gets the phrase that describes the scrubber's intersection with the primary graph, which may be showing
   * the primary curve, the predict curve, both, or neither.
   */
  private getPrimaryPhrase(): string {
    let primaryPhrase: string;
    if ( this.predictEnabledProperty.value ) {
      primaryPhrase = ACCESSIBLE_STRINGS.primaryPhrase.predictAndPrimary.format( {
        predictPhrase: this.getPredictCurvePhrase(),
        primaryPhrase: this.getPrimaryCurvePhrase()
      } );
    }
    else {
      primaryPhrase = this.getPrimaryCurvePhrase();
    }
    return primaryPhrase;
  }

  /**
   * Gets the phrase that describes the scrubber's intersection with the predict curve.
   * The predict curve is described as undefined (if there is a discontinuity), a y-value, or hidden.
   */
  private getPredictCurvePhrase(): string {
    let predictPhrase: string;
    if ( this.primaryCurveLayerVisibleProperty.value && this.predictEnabledProperty.value ) {
      const point = this.referenceLine.predictCurvePointProperty.value;
      if ( point.isDiscontinuous ) {
        // undefined
        predictPhrase = ACCESSIBLE_STRINGS.primaryPhrase.predictUndefined.format( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value
        } );
      }
      else {
        // y-value
        predictPhrase = ACCESSIBLE_STRINGS.primaryPhrase.predictValue.format( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
          value: toFixedNumber( point.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS )
        } );
      }
    }
    else {
      // hidden
      predictPhrase = ACCESSIBLE_STRINGS.primaryPhrase.predictHiddenStringProperty.value;
    }
    return predictPhrase;
  }

  /**
   * Gets the phrase that describes the scrubber's intersection with the primary curve.
   * The primary curve is described as undefined (if there is a discontinuity), a y-value, or hidden.
   */
  private getPrimaryCurvePhrase(): string {
    let primaryCurvePhrase: string;
    if ( this.primaryCurveLayerVisibleProperty.value && ( !this.predictEnabledProperty.value || this.showOriginalCurveProperty.value ) ) {
      const point = this.referenceLine.originalCurvePointProperty.value;
      if ( point.isDiscontinuous ) {
        // undefined
        primaryCurvePhrase = ACCESSIBLE_STRINGS.primaryPhrase.primaryUndefined.format( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value
        } );
      }
      else {
        // y-value
        primaryCurvePhrase = ACCESSIBLE_STRINGS.primaryPhrase.primaryValue.format( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
          value: toFixedNumber( point.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS )
        } );
      }
    }
    else {
      // hidden
      primaryCurvePhrase = ACCESSIBLE_STRINGS.primaryPhrase.primaryHiddenStringProperty.value;
    }
    return primaryCurvePhrase;
  }

  /**
   * Gets the phrase that describes the scrubber's intersection with the integral graph.
   * The integral is described as a y-value or hidden.
   */
  private getIntegralPhrase(): string {
    let integralPhrase: string;
    if ( this.integralCurveLayerVisibleProperty.value ) {
      // y-value
      integralPhrase = ACCESSIBLE_STRINGS.integralPhrase.integralValue.format( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
        value: toFixedNumber( this.referenceLine.integralCurvePointProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS )
      } );
    }
    else {
      // hidden
      integralPhrase = ACCESSIBLE_STRINGS.integralPhrase.integralHiddenStringProperty.value;
    }
    return integralPhrase;
  }

  /**
   * Gets the phrase that describes the scrubber's intersection with the derivative graph.
   * The derivative is described as undefined (if there is a discontinuity), a y-value, or hidden.
   */
  private getDerivativePhrase(): string {
    let derivativePhrase: string;
    if ( this.derivativeCurveLayerVisibleProperty.value ) {
      const point = this.referenceLine.derivativeCurvePointProperty.value;
      if ( point.isDiscontinuous ) {
        // undefined
        derivativePhrase = ACCESSIBLE_STRINGS.derivativePhrase.derivativeUndefined.format( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value
        } );
      }
      else {
        // y-value
        derivativePhrase = ACCESSIBLE_STRINGS.derivativePhrase.derivativeValue.format( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
          value: toFixedNumber( point.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS )
        } );
      }
    }
    else {
      // hidden
      derivativePhrase = ACCESSIBLE_STRINGS.derivativePhrase.derivativeHiddenStringProperty.value;
    }
    return derivativePhrase;
  }

  /**
   * Gets the phrase that describes the scrubber's intersection with the second derivative graph.
   * The second derivative is described as undefined (if there is a discontinuity), a y-value, or hidden.
   */
  private getSecondDerivativePhrase(): string {
    let secondDerivativePhrase: string;
    if ( this.secondDerivativeCurveLayerVisibleProperty.value ) {
      const point = this.referenceLine.secondDerivativeCurvePointProperty.value;
      if ( point.isDiscontinuous ) {
        // undefined
        secondDerivativePhrase = ACCESSIBLE_STRINGS.secondDerivativePhrase.secondDerivativeUndefined.format( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value
        } );
      }
      else {
        // y-value
        secondDerivativePhrase = ACCESSIBLE_STRINGS.secondDerivativePhrase.secondDerivativeValue.format( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
          value: toFixedNumber( point.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS )
        } );
      }
    }
    else {
      // hidden
      secondDerivativePhrase = ACCESSIBLE_STRINGS.secondDerivativePhrase.secondDerivativeHiddenStringProperty.value;
    }
    return secondDerivativePhrase;
  }
}

calculusGrapher.register( 'ReferenceLineDescriber', ReferenceLineDescriber );