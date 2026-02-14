// Copyright 2026, University of Colorado Boulder

/**
 * PrimaryGraphAccessibleListNode is the accessible list that describes the Primary graph,
 * which is (confusingly) known as the "primary graph" for core description.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import PredictCurve from '../../model/PredictCurve.js';
import PrimaryCurve from '../../model/PrimaryCurve.js';
import GraphAccessibleListNode from './GraphAccessibleListNode.js';

export default class PrimaryGraphAccessibleListNode extends GraphAccessibleListNode {

  public constructor( primaryCurve: PrimaryCurve,
                      predictCurve: PredictCurve,
                      primaryCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      predictCurveVisibleProperty: TReadOnlyProperty<boolean>,
                      predictEnabledProperty: TReadOnlyProperty<boolean>,
                      gridVisibleProperty: TReadOnlyProperty<boolean> ) {

    const listItems: AccessibleListItem[] = [
      PrimaryGraphAccessibleListNode.getPrimaryCurveListItem( primaryCurve, primaryCurveVisibleProperty ),
      PrimaryGraphAccessibleListNode.getPredictCurveListItem( predictCurve, predictCurveVisibleProperty, predictEnabledProperty ),
      GraphAccessibleListNode.getCoordinateGridListItem( gridVisibleProperty ),
      GraphAccessibleListNode.getValuesListItem()
    ];

    super( listItems );
  }

  /**
   * Gets the bullet list item that describes the primary curve.
   */
  private static getPrimaryCurveListItem(
    primaryCurve: PrimaryCurve,
    primaryCurveVisibleProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {

    // _.uniq is needed to prevent duplicate dependencies because FluentPatterns share dependent Properties.
    const dependencies = _.uniq( [

      // Description choices.
      CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.primaryCurve.continuousAndDifferentiableStringProperty,
      ...CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.primaryCurve.continuousAndNotDifferentiable.getDependentProperties(),
      ...CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.primaryCurve.discontinuousAndNotDifferentiable.getDependentProperties(),
      CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.primaryCurve.hiddenStringProperty,

      // Values used in the above descriptions.
      primaryCurve.numberOfDiscontinuitiesProperty,
      primaryCurve.numberOfCuspsProperty,
      primaryCurveVisibleProperty
    ] );

    const stringProperty = DerivedStringProperty.deriveAny( dependencies,
      () => {
        let string: string;

        if ( primaryCurveVisibleProperty.value ) {
          const numberOfDiscontinuities = primaryCurve.numberOfDiscontinuitiesProperty.value;
          const numberOfCusps = primaryCurve.numberOfCuspsProperty.value;

          if ( numberOfDiscontinuities === 0 && numberOfCusps === 0 ) {
            string = CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.primaryCurve.continuousAndDifferentiableStringProperty.value;
          }
          else if ( numberOfDiscontinuities === 0 && numberOfCusps > 0 ) {
            string = CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.primaryCurve.continuousAndNotDifferentiable.format( {
              numberOfCusps: numberOfCusps
            } );
          }
          else {
            string = CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.primaryCurve.discontinuousAndNotDifferentiable.format( {
              numberOfDiscontinuities: numberOfDiscontinuities,
              numberOfCusps: numberOfCusps
            } );
          }
        }
        else {
          // Hidden
          string = CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.primaryCurve.hiddenStringProperty.value;
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
  private static getPredictCurveListItem( predictCurve: PredictCurve,
                                          predictCurveVisibleProperty: TReadOnlyProperty<boolean>,
                                          predictEnabledProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {

    // _.uniq is needed to prevent duplicate dependencies because FluentPatterns share dependent Properties.
    const dependencies = _.uniq( [

      // Description choices.
      CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.predictCurve.continuousAndDifferentiableStringProperty,
      ...CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.predictCurve.continuousAndNotDifferentiable.getDependentProperties(),
      ...CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.predictCurve.discontinuousAndNotDifferentiable.getDependentProperties(),
      CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.predictCurve.hiddenStringProperty,

      // Values used in the above descriptions.
      predictCurve.numberOfDiscontinuitiesProperty,
      predictCurve.numberOfCuspsProperty,
      predictCurveVisibleProperty
    ] );

    const primaryCurveStringProperty = DerivedStringProperty.deriveAny( dependencies,
      () => {

        let string: string;

        if ( predictCurveVisibleProperty.value && predictEnabledProperty.value ) {

          const numberOfDiscontinuities = predictCurve.numberOfDiscontinuitiesProperty.value;
          const numberOfCusps = predictCurve.numberOfCuspsProperty.value;

          if ( numberOfDiscontinuities === 0 && numberOfCusps === 0 ) {
            string = CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.predictCurve.continuousAndDifferentiableStringProperty.value;
          }
          else if ( numberOfDiscontinuities === 0 && numberOfCusps > 0 ) {
            string = CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.predictCurve.continuousAndNotDifferentiable.format( {
              numberOfCusps: numberOfCusps
            } );
          }
          else {
            string = CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.predictCurve.discontinuousAndNotDifferentiable.format( {
              numberOfDiscontinuities: numberOfDiscontinuities,
              numberOfCusps: numberOfCusps
            } );
          }
        }
        else {
          // Hidden
          string = CalculusGrapherFluent.a11y.graphArea.primary.accessibleList.predictCurve.hiddenStringProperty.value;
        }
        return string;
      } );

    return {
      stringProperty: primaryCurveStringProperty,
      visibleProperty: predictEnabledProperty
    };
  }
}

calculusGrapher.register( 'PrimaryGraphAccessibleListNode', PrimaryGraphAccessibleListNode );