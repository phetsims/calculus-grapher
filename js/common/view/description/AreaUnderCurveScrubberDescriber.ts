// Copyright 2026, University of Colorado Boulder

/**
 * AreaUnderCurveScrubberDescriber creates accessible responses for the Area Under Curve scrubber.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { toFixedNumber } from '../../../../../dot/js/util/toFixedNumber.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../../CalculusGrapherSymbols.js';
import AreaUnderCurveScrubber from '../../model/AreaUnderCurveScrubber.js';
import CurvePoint from '../../model/CurvePoint.js';

export default class AreaUnderCurveScrubberDescriber {

  public constructor( private readonly areaUnderCurveScrubber: AreaUnderCurveScrubber,
                      private readonly integralCurveLayerVisibleProperty: TReadOnlyProperty<boolean>,
                      private readonly primaryCurveLayerVisibleProperty: TReadOnlyProperty<boolean>
  ) {
    // All fields are defined and initialized via constructor params.
  }

  /**
   * Gets the accessible object response that describes the scrubber's position and what its vertical line intersects.
   */
  public getAccessibleObjectResponse(): string {
    return CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.pattern.format( {
      xPhrase: this.getXPhrase(),
      integralPhrase: this.getIntegralPhrase(),
      areaPhrase: this.getAreaPhrase()
    } );
  }

  /**
   * Gets the phrase that describes the scrubber's position along the horizontal axis.
   */
  private getXPhrase(): string {
    return CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.xPhrase.format( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
      value: toFixedNumber( this.areaUnderCurveScrubber.xProperty.value, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS )
    } );
  }

  /**
   * Gets the phrase that describes the scrubber's intersection with the integral graph.
   * The integral is described as a y-value or hidden.
   */
  private getIntegralPhrase(): string {
    let integralPhrase: string;
    if ( this.integralCurveLayerVisibleProperty.value ) {
      // y-value
      integralPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.integralPhrase.integralValue.format( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
        value: toFixedNumber( this.areaUnderCurveScrubber.integralCurvePointProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS )
      } );
    }
    else {
      // hidden
      integralPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.integralPhrase.hiddenStringProperty.value;
    }
    return integralPhrase;
  }

  /**
   * Gets the phrase that describes the area under the primary curve from 0 to the scrubber's position.
   * Area is described as zero, positive, negative, or hidden.
   */
  private getAreaPhrase(): string {
    let areaPhrase: string;
    if ( this.primaryCurveLayerVisibleProperty.value ) {
      const area = toFixedNumber( this.areaUnderCurveScrubber.integralCurvePointProperty.value.y, CalculusGrapherConstants.AREA_DESCRIPTION_DECIMALS );
      if ( area === 0 ) {
        // zero
        areaPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.zeroStringProperty.value;
      }
      else if ( area > 0 ) {
        // positive
        areaPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.positive.format( {
          absoluteArea: Math.abs( area )
        } );
      }
      else {
        // negative
        areaPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.negative.format( {
          absoluteArea: Math.abs( area )
        } );
      }
    }
    else {
      // hidden
      areaPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.areaPhrase.hiddenStringProperty.value;
    }
    return areaPhrase;
  }

  /**
   * Gets the accessible paragraph that describes the content for the 'Net Signed Area' accordion box.
   */
  public static getNetSignedAreaAccessibleParagraph( integralCurveProperty: TReadOnlyProperty<CurvePoint> ): TReadOnlyProperty<string> {

    // _.uniq is needed to prevent duplicate dependencies because FluentPatterns share dependent Properties.
    const accessibleParagraphDependencies = _.uniq( [

      // Possible description strings.
      ...CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleParagraph.zero.getDependentProperties(),
      ...CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleParagraph.positive.getDependentProperties(),
      ...CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleParagraph.negative.getDependentProperties(),

      // Values to fill in the above descriptions.
      integralCurveProperty,
      CalculusGrapherSymbols.accessibleVariableSymbolProperty
    ] );

    return DerivedStringProperty.deriveAny( accessibleParagraphDependencies,
      () => {
        const variable = CalculusGrapherSymbols.accessibleVariableSymbolProperty.value;
        const integralPoint = integralCurveProperty.value;
        const x = toFixedNumber( integralPoint.x, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS );
        const y = toFixedNumber( integralPoint.y, CalculusGrapherConstants.AREA_DESCRIPTION_DECIMALS );

        let string: string;
        if ( y === 0 ) {
          // zero
          string = CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleParagraph.zero.format( {
            variable: variable,
            x: x
          } );
        }
        else if ( y > 0 ) {
          // positive
          string = CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleParagraph.positive.format( {
            absoluteArea: Math.abs( y ),
            variable: variable,
            x: x
          } );
        }
        else {
          // negative
          string = CalculusGrapherFluent.a11y.netSignedAreaAccordionBox.accessibleParagraph.negative.format( {
            absoluteArea: Math.abs( y ),
            variable: variable,
            x: x
          } );
        }
        return string;
      } );
  }
}

calculusGrapher.register( 'AreaUnderCurveScrubberDescriber', AreaUnderCurveScrubberDescriber );