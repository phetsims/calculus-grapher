// Copyright 2026, University of Colorado Boulder

/**
 * OriginalGraphAccessibleListNode is the accessible list that describes the original graph,
 * which is (confusingly) known as the "primary graph" for core description.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import TransformedCurve from '../../model/TransformedCurve.js';
import GraphAccessibleListNode from './GraphAccessibleListNode.js';

const ACCESSIBLE_LIST_STRINGS = CalculusGrapherFluent.a11y.graphArea.primary.accessibleListNode;

export default class OriginalGraphAccessibleListNode extends GraphAccessibleListNode {

  public constructor( originalCurve: TransformedCurve,
                      predictCurve: TransformedCurve,
                      originalCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      predictCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      gridVisibleProperty: TReadOnlyProperty<boolean> ) {

    const listItems: AccessibleListItem[] = [
      OriginalGraphAccessibleListNode.getPrimaryCurveListItem( originalCurve, originalCurveVisibleProperty ),
      OriginalGraphAccessibleListNode.getPredictCurveListItem( predictCurve, predictCurveVisibleProperty ),
      GraphAccessibleListNode.getCoordinateGridListItem( gridVisibleProperty ),
      GraphAccessibleListNode.getValuesListItem()
    ];

    super( listItems );
  }

  /**
   * Gets the bullet list item that describes the primary curve.
   */
  private static getPrimaryCurveListItem(
    originalCurve: TransformedCurve,
    originalCurveVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {

    // _.uniq is needed to prevent duplicate dependencies because FluentPatterns share dependent Properties.
    const dependencies = _.uniq( [

      // Possible description strings.
      ACCESSIBLE_LIST_STRINGS.primaryCurve.continuousAndDifferentiableStringProperty,
      ...ACCESSIBLE_LIST_STRINGS.primaryCurve.continuousAndNotDifferentiable.getDependentProperties(),
      ...ACCESSIBLE_LIST_STRINGS.primaryCurve.discontinuousAndNotDifferentiable.getDependentProperties(),
      ACCESSIBLE_LIST_STRINGS.primaryCurve.hiddenStringProperty,

      // Values to fill in the above descriptions.
      originalCurve.numberOfDiscontinuitiesProperty,
      originalCurve.numberOfCuspsProperty,
      originalCurveVisibleProperty
    ] );

    const stringProperty = DerivedStringProperty.deriveAny( dependencies,
      () => {
        let string: string;

        if ( originalCurveVisibleProperty.value ) {
          const numberOfDiscontinuities = originalCurve.numberOfDiscontinuitiesProperty.value;
          const numberOfCusps = originalCurve.numberOfCuspsProperty.value;

          if ( numberOfDiscontinuities === 0 && numberOfCusps === 0 ) {
            string = ACCESSIBLE_LIST_STRINGS.primaryCurve.continuousAndDifferentiableStringProperty.value;
          }
          else if ( numberOfDiscontinuities === 0 && numberOfCusps > 0 ) {
            string = ACCESSIBLE_LIST_STRINGS.primaryCurve.continuousAndNotDifferentiable.format( {
              numberOfCusps: numberOfCusps
            } );
          }
          else {
            string = ACCESSIBLE_LIST_STRINGS.primaryCurve.discontinuousAndNotDifferentiable.format( {
              numberOfDiscontinuities: numberOfDiscontinuities,
              numberOfCusps: numberOfCusps
            } );
          }
        }
        else {
          // Hidden
          string = ACCESSIBLE_LIST_STRINGS.primaryCurve.hiddenStringProperty.value;
        }
        return string;
      } );

    return {
      stringProperty: stringProperty
    };
  }

  /**
   * Gets the bullet list item that describes the predict curve.
   */
  private static getPredictCurveListItem( predictCurve: TransformedCurve,
                                          predictCurveVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {

    // _.uniq is needed to prevent duplicate dependencies because FluentPatterns share dependent Properties.
    const dependencies = _.uniq( [

      // Possible description strings.
      ACCESSIBLE_LIST_STRINGS.predictCurve.continuousAndDifferentiableStringProperty,
      ...ACCESSIBLE_LIST_STRINGS.predictCurve.continuousAndNotDifferentiable.getDependentProperties(),
      ...ACCESSIBLE_LIST_STRINGS.predictCurve.discontinuousAndNotDifferentiable.getDependentProperties(),
      ACCESSIBLE_LIST_STRINGS.predictCurve.hiddenStringProperty,

      // Values to fill in the above descriptions.
      predictCurve.numberOfDiscontinuitiesProperty,
      predictCurve.numberOfCuspsProperty,
      predictCurveVisibleProperty
    ] );

    const primaryCurveStringProperty = DerivedStringProperty.deriveAny( dependencies,
      () => {

        let string: string;

        if ( predictCurveVisibleProperty.value ) {

          const numberOfDiscontinuities = predictCurve.numberOfDiscontinuitiesProperty.value;
          const numberOfCusps = predictCurve.numberOfCuspsProperty.value;

          if ( numberOfDiscontinuities === 0 && numberOfCusps === 0 ) {
            string = ACCESSIBLE_LIST_STRINGS.predictCurve.continuousAndDifferentiableStringProperty.value;
          }
          else if ( numberOfDiscontinuities === 0 && numberOfCusps > 0 ) {
            string = ACCESSIBLE_LIST_STRINGS.predictCurve.continuousAndNotDifferentiable.format( {
              numberOfCusps: numberOfCusps
            } );
          }
          else {
            string = ACCESSIBLE_LIST_STRINGS.predictCurve.discontinuousAndNotDifferentiable.format( {
              numberOfDiscontinuities: numberOfDiscontinuities,
              numberOfCusps: numberOfCusps
            } );
          }
        }
        else {
          // Hidden
          string = ACCESSIBLE_LIST_STRINGS.predictCurve.hiddenStringProperty.value;
        }
        return string;
      } );

    return {
      stringProperty: primaryCurveStringProperty
    };
  }
}

calculusGrapher.register( 'OriginalGraphAccessibleListNode', OriginalGraphAccessibleListNode );