// Copyright 2026, University of Colorado Boulder

/**
 * // TODO REVIEW: A previous commit changed "original" to "primary" and made this comment
 *      documentation more confusing than the original confusion. Update. https://github.com/phetsims/calculus-grapher/issues/366
 * PrimaryGraphAccessibleListNode is the accessible list that describes the Primary graph,
 * which is (confusingly) known as the "primary graph" for core description.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import affirm from '../../../../../perennial-alias/js/browser-and-node/affirm.js';
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
                      showPrimaryCurveProperty: TReadOnlyProperty<boolean>,
                      gridVisibleProperty: TReadOnlyProperty<boolean> ) {

    const listItems: AccessibleListItem[] = [
      PrimaryGraphAccessibleListNode.getPrimaryCurveListItem( primaryCurve, primaryCurveVisibleProperty, predictEnabledProperty, showPrimaryCurveProperty ),
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
    primaryCurveVisibleProperty: TReadOnlyProperty<boolean>,
    predictEnabledProperty: TReadOnlyProperty<boolean>,
    showPrimaryCurveProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {

    const stringProperty = new DerivedStringProperty( [

        // Description choices.
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.primaryCurve.continuousAndDifferentiableStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.primaryCurve.hasDiscontinuitiesStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.primaryCurve.hasCuspsStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.primaryCurve.hasDiscontinuitiesAndCuspsStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.primaryCurve.hiddenStringProperty,

        // Values used to select one of the above descriptions.
        primaryCurve.numberOfDiscontinuousPointsProperty,
        primaryCurve.numberOfCuspPointsProperty,
        primaryCurveVisibleProperty
      ],
      (
        continuousAndDifferentiableString,
        hasDiscontinuities,
        hasCuspsString,
        hasDiscontinuitiesAndCusps,
        hiddenString,
        numberOfDiscontinuousPoints,
        numberOfCuspPoints,
        primaryCurveVisible
      ) => {
        let string: string;

        if ( primaryCurveVisible ) {
          if ( numberOfDiscontinuousPoints === 0 && numberOfCuspPoints === 0 ) {
            // Continuous and differentiable.
            string = continuousAndDifferentiableString;
          }
          else if ( numberOfDiscontinuousPoints > 0 && numberOfCuspPoints === 0 ) {
            // Not differentiable at one or more discontinuities.
            string = hasDiscontinuities;
          }
          else if ( numberOfDiscontinuousPoints === 0 && numberOfCuspPoints > 0 ) {
            // Continuous but not differentiable at one or more cusps.
            string = hasCuspsString;
          }
          else {
            // Not differentiable at one or more discontinuities and one or more cusps.
            affirm( numberOfDiscontinuousPoints > 0 && numberOfCuspPoints > 0 );
            string = hasDiscontinuitiesAndCusps;
          }
        }
        else {
          // Hidden
          string = hiddenString;
        }
        return string;
      } );

    return {
      stringProperty: stringProperty,
      visibleProperty: new DerivedProperty( [ predictEnabledProperty, showPrimaryCurveProperty ],
        ( predictEnabled, showPrimaryCurve ) => !predictEnabled || showPrimaryCurve )
    };
  }

  /**
   * Gets the bullet list item that describes the predict curve.
   */
  private static getPredictCurveListItem( predictCurve: PredictCurve,
                                          predictCurveVisibleProperty: TReadOnlyProperty<boolean>,
                                          predictEnabledProperty: TReadOnlyProperty<boolean> ): AccessibleListItem {

    const primaryCurveStringProperty = new DerivedStringProperty( [

        // Description choices.
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.predictCurve.continuousAndDifferentiableStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.predictCurve.hasDiscontinuitiesStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.predictCurve.hasCuspsStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.predictCurve.hasDiscontinuitiesAndCuspsStringProperty,
        CalculusGrapherFluent.a11y.graphAreas.primary.accessibleList.predictCurve.hiddenStringProperty,

        // Values used in the above descriptions.
        predictCurve.numberOfDiscontinuousPointsProperty,
        predictCurve.numberOfCuspPointsProperty,
        predictCurveVisibleProperty,
        predictEnabledProperty
      ],
      (
        continuousAndDifferentiableString,
        hasDiscontinuities,
        hasCuspsString,
        hasDiscontinuitiesAndCusps,
        hiddenString,
        numberOfDiscontinuousPoints,
        numberOfCuspPoints,
        predictCurveVisible,
        predictEnabled
      ) => {

        let string: string;

        if ( predictCurveVisible && predictEnabled ) {
          if ( numberOfDiscontinuousPoints === 0 && numberOfCuspPoints === 0 ) {
            // Continuous and differentiable.
            string = continuousAndDifferentiableString;
          }
          else if ( numberOfDiscontinuousPoints > 0 && numberOfCuspPoints === 0 ) {
            // Not differentiable at one or more discontinuities.
            string = hasDiscontinuities;
          }
          else if ( numberOfDiscontinuousPoints === 0 && numberOfCuspPoints > 0 ) {
            // Continuous but not differentiable at one or more cusps.
            string = hasCuspsString;
          }
          else {
            // Not differentiable at one or more discontinuities and one or more cusps.
            affirm( numberOfDiscontinuousPoints > 0 && numberOfCuspPoints > 0 );
            string = hasDiscontinuitiesAndCusps;
          }
        }
        else {
          // Hidden
          string = hiddenString;
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