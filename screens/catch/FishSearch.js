import fishTypes from '../../data/master/fishTypes';

/******************************
 * FishSearch class
 * The filter method is used for searching fish name by keyword.
 ******************************/
export default class FishSearch {
  /**
   * "fish" has all fish data.
   * "dictionary" has indexed fish data
   *  and is for quick search.
   */
  constructor() {
    this.fish = fishTypes;
    this.dictionary = this._createFishDictionary();
  }

  /******************************
   * Public methods
   ******************************/

  /**
   * Filter fish name by keyword.
   * @param  {String} keyword [input text]
   * @return {Object}         [filtered fish]
   */
  filter(keyword) {
    let filtered = [];
    const kana = this._convertToKatakana(keyword);
    const indexed = this._indexFilteredFish(this.dictionary, kana[0]);
    indexed.fishes.forEach(fish => {
      if (fish.katakana.indexOf(kana) > -1) {
        filtered.push(fish);
      }
    });
    return filtered;
  }

  /**
   * Check keyword whether it is kana.
   * @param  {String}  keyword [input text]
   * @return {Boolean}         [true if invalid]
   */
  isInvalidKeyword(keyword) {
    return keyword.match(/[^ぁ-んァ-ヶー\s]/);
  }

  /******************************
   * Private methods
   ******************************/

  /**
   * Create fish dictionary.
   * Fish data is grouped by the first one string.
   * @return {Object} [indexed fish dictionary]
   */
  _createFishDictionary() {
    let dictionary = [];
    for (let i = 0; i < this.fish.length; i++) {
      let fish = this.fish[i];
      let found = false;
      dictionary.forEach(d => {
        if (d.index === fish.katakana[0]) {
          found = true;
          d.fishes.push(fish);
        }
      });
      if (!found) {
        dictionary.push({ index: fish.katakana[0], fishes: [fish] });
      }
    }
    return dictionary;
  }

  /**
   * Convert text to katakana.
   * Text should be kana but alphanum.
   * @param  {String} text [kana(hiragana or katakana)]
   * @return {String}      [katakana]
   */
  _convertToKatakana(text) {
    return text.replace(/[\u3041-\u3096]/g, function(match) {
      var chr = match.charCodeAt(0) + 0x60;
      return String.fromCharCode(chr);
    });
  }

  /**
   * Get indexed fish group.
   * @param  {[type]} dictionary [description]
   * @param  {[type]} index      [description]
   * @return {[type]}            [description]
   */
  _indexFilteredFish(dictionary, index) {
    for (let i = 0; i < dictionary.length; i++) {
      if (dictionary[i].index === index) {
        return dictionary[i];
      }
    }
    return [];
  }
}
