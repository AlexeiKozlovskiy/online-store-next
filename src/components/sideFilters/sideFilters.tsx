'use client';
import './sideFilters.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Slider from 'react-slider';
import { toggleShowFilters } from '@/store/controller';
import { useMyURLContext } from '@/context/URLContext';
import { DualRangeInput } from './dualRangeInput';
import { ButtonCross } from '@/components/buttonCross/buttonCross';
import { PRICE_MIN, PRICE_MAX, SIZE_MIN, SIZE_MAX, STOCK_MIN, STOCK_MAX } from '@/helpers/constant';
import { Balancers, DualRange, IviewSideFilters, RootReducerProps, SelectedFilter } from '@/types/types';

const CategoryCount = dynamic(() => import('./categoryCount'), {
  loading: () => <></>,
  ssr: false,
});

export default function SideFilters() {
  const { selectedFilters, setSelectedFilters } = useMyURLContext();
  const [[priseMin, priseMax], setPrice] = useState<DualRange>([null, null]);
  const [[sizeMin, sizeMax], setSize] = useState<DualRange>([null, null]);
  const [[stockMin, stockMax], setStock] = useState<DualRange>([null, null]);
  const { balancerColor, balancerCollection, balancerCategory, balancerPrise, balancerSize, balancerStock } = useSelector<
    RootReducerProps,
    Balancers
  >((state) => state.balansersFilters);

  const { showFilters } = useSelector<RootReducerProps, IviewSideFilters>((state) => state.viewSideFilters);

  const { colorsSelected, collectionsSelected, categorySelected, priceSelected, sizeSelected, stockSelected } = selectedFilters;

  const [balancedMinPrice, balancedMaxPrice] = balancerPrise;
  const [balancedMinSize, balancedMaxSize] = balancerSize;
  const [balancedMinStock, balancedMaxStock] = balancerStock;

  const [selectedMinPrice, selectedMaxPrice] = priceSelected;
  const [selectedMinSize, selectedMaxSize] = sizeSelected;
  const [selectedMinStock, selectedMaxStock] = stockSelected;

  useEffect(() => {
    function getSelectedFilters() {
      setPrice([selectedMinPrice, selectedMaxPrice]);
      setSize([selectedMinSize, selectedMaxSize]);
      setStock([selectedMinStock, selectedMaxStock]);
    }
    getSelectedFilters();
  }, [selectedMinPrice, selectedMaxPrice, selectedMinSize, selectedMaxSize, selectedMinStock, selectedMaxStock]);

  useEffect(() => {
    function getBalancerFilters() {
      if (selectedMinPrice === PRICE_MIN && selectedMaxPrice === PRICE_MAX) {
        setPrice([balancedMinPrice, balancedMaxPrice]);
      }
      if (selectedMinSize === SIZE_MIN && selectedMaxSize === SIZE_MAX) {
        setSize([balancedMinSize, balancedMaxSize]);
      }
      if (selectedMinStock === STOCK_MIN && selectedMaxStock === STOCK_MAX) {
        setStock([balancedMinStock, balancedMaxStock]);
      }
    }
    getBalancerFilters();
  }, [
    balancedMinPrice,
    balancedMaxPrice,
    balancedMinSize,
    balancedMaxSize,
    balancedMinStock,
    balancedMaxStock,
    selectedMinPrice,
    selectedMaxPrice,
    selectedMinSize,
    selectedMaxSize,
    selectedMinStock,
    selectedMaxStock,
  ]);

  const handleColorClick = (color: string) => {
    // handleClickFilters(true);
    const updatedColors = colorsSelected.includes(color)
      ? colorsSelected.filter((el) => el !== color)
      : [...colorsSelected, color];
    setSelectedFilters({ ...selectedFilters, colorsSelected: updatedColors });
  };

  const handleCollectionClick = (collection: string) => {
    // handleClickFilters(true);
    const updatedCollections = collectionsSelected.includes(+collection)
      ? collectionsSelected.filter((el) => el !== +collection)
      : [...collectionsSelected, +collection];
    setSelectedFilters({ ...selectedFilters, collectionsSelected: updatedCollections });
  };

  const handelCategoryChange = (category: string) => {
    // handleClickFilters(true);
    const updatedCategories = categorySelected.includes(category)
      ? selectedFilters.categorySelected.filter((el) => el !== category)
      : [...selectedFilters.categorySelected, category];
    setSelectedFilters({ ...selectedFilters, categorySelected: updatedCategories });
  };

  function handleInputChange(selectedType: string, startValue: string, endValue: string) {
    setSelectedFilters({
      ...selectedFilters,
      [selectedType]: [parseFloat(startValue) || null, parseFloat(endValue) || null],
    });
  }

  const handleSliderChange = (type: string, value: DualRange, setFilter: SelectedFilter) => {
    // handleClickFilters(true);
    setSelectedFilters({ ...selectedFilters, [type]: value });
    setFilter(value);
  };

  const ColorFilter = (
    <div className="filters-item__content item-content">
      <div className="item-content__colors colors">
        {balancerColor.map(({ color }) => (
          <div
            key={color}
            className={`colors__color is-${color} ${colorsSelected.includes(color) && 'is-selected'}`}
            data-color={color}
            data-testid={`button-color-${color}`}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>
    </div>
  );

  const CollectionFilter = (
    <div className="filters-item__content item-content">
      <div className="item-content__collection collection">
        {balancerCollection.map(({ collection }) => (
          <div
            key={collection}
            className={`collection__year ${collectionsSelected.includes(collection) && 'is-selected'}`}
            data-collection={collection}
            onClick={() => handleCollectionClick(collection.toString())}
          >
            {collection}
          </div>
        ))}
      </div>
    </div>
  );

  const CategoryFilter = (
    <div className="filters-item__content item-content">
      {balancerCategory.map(({ category: categoryName, count }) => {
        const id = categoryName.toLowerCase().replace(' ', '-');
        return (
          <div key={id} className="item-content__category category">
            <label htmlFor={id} className="category__label">
              {categoryName}
            </label>
            <CategoryCount count={count} />
            <input
              id={id}
              type="checkbox"
              checked={selectedFilters.categorySelected.includes(categoryName)}
              className="category__checkbox"
              onChange={() => handelCategoryChange(categoryName)}
              data-categories={categoryName}
            />
          </div>
        );
      })}
    </div>
  );

  const PriceFilter = (
    <div className="filters-item__content item-content">
      <div className="item-content__price price">
        <DualRangeInput
          value={priseMin || ''}
          unit={'$'}
          unitPosition={'start'}
          onChange={(e: { target: { value: string } }) =>
            handleInputChange('priceSelected', e.target.value, priseMax!.toString())
          }
          id="priceMinSelected"
        />
        <DualRangeInput
          value={priseMax || ''}
          unit={'$'}
          unitPosition={'end'}
          onChange={(e: { target: { value: string } }) =>
            handleInputChange('priceSelected', priseMin!.toString(), e.target.value)
          }
          id="priceMaxSelected"
        />
      </div>
      <Slider
        className="slider"
        onAfterChange={(value: [number, number]) => handleSliderChange('priceSelected', value, setPrice)}
        value={[priseMin!, priseMax!]}
        min={PRICE_MIN}
        max={PRICE_MAX}
      />
    </div>
  );

  const SizeFilter = (
    <div className="filters-item__content item-content">
      <div className="item-content__size size">
        <DualRangeInput
          value={sizeMin || ''}
          unit={'cm'}
          unitPosition={'start'}
          onChange={(e) => handleInputChange('sizeSelected', e.target.value, sizeMax!.toString())}
          id="sizeMinSelected"
        />
        <DualRangeInput
          value={sizeMax || ''}
          unit={'cm'}
          unitPosition={'end'}
          onChange={(e: { target: { value: string } }) => handleInputChange('sizeSelected', sizeMin!.toString(), e.target.value)}
          id="sizeMaxSelected"
        />
      </div>
      <Slider
        className="slider"
        onAfterChange={(value: [number, number]) => handleSliderChange('sizeSelected', value, setSize)}
        value={[sizeMin!, sizeMax!]}
        min={SIZE_MIN}
        max={SIZE_MAX}
      />
    </div>
  );

  const StockFilter = (
    <div className="filters-item__content item-content">
      <div className="item-content__stock stock">
        <DualRangeInput
          value={stockMin || ''}
          unit={''}
          unitPosition={''}
          onChange={(e: { target: { value: string } }) =>
            handleInputChange('stockSelected', e.target.value, stockMax!.toString())
          }
          id="stockMinSelected"
        />
        <DualRangeInput
          value={stockMax || ''}
          unit={''}
          unitPosition={''}
          onChange={(e: { target: { value: string } }) =>
            handleInputChange('stockSelected', stockMin!.toString(), e.target.value)
          }
          id="stockMaxSelected"
        />
      </div>
      <Slider
        className="slider"
        onAfterChange={(value: [number, number]) => handleSliderChange('stockSelected', value, setStock)}
        value={[stockMin!, stockMax!]}
        min={STOCK_MIN}
        max={STOCK_MAX}
      />
    </div>
  );

  return (
    <div className="filters" data-show={showFilters} data-testid="filterPanel">
      <div className="filters__item filters-item">
        <div className="filters-item__title">Color</div>
        {ColorFilter}
      </div>
      <div className="filters__item filters-item">
        <div className="filters-item__title">Collection</div>
        {CollectionFilter}
      </div>
      <div className="filters__item filters-item">
        <div className="filters-item__title">Price</div>
        {PriceFilter}
      </div>
      <div className="filters__item filters-item">
        <div className="filters-item__title">Size</div>
        {SizeFilter}
      </div>
      <div className="filters__item filters-item">
        <div className="filters-item__title">Category</div>
        {CategoryFilter}
      </div>
      <div className="filters__item filters-item">
        <div className="filters-item__title">In stock</div>
        {StockFilter}
      </div>
      <ButtonCross onClickCross={() => toggleShowFilters()} adittionClassName="close-side-filters-cross" />
    </div>
  );
}
