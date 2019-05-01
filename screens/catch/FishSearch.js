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
    this.fish = [];
    this.dictionary = [];
    this._initializeFishLists(fishTypes);
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
    const kana = this._convertToKatakana(keyword);
    let filtered = [{ id: 0, header: true, name: kana[0] }];
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

  /**
   * Get all fish.
   * @return {Object} [all fish]
   */
  allFish() {
    return this.fish;
  }

  /******************************
   * Private methods
   ******************************/

  /**
   * Create fish list with header.
   * @param  {Array} fish [fish list]
   * @return {Array}      [fish list with header]
   */
  _initializeFishLists(fish) {
    for (let i = 0; i < fish.length; i++) {
      let found = false;
      let f = fish[i];
      this.dictionary.forEach(d => {
        if (d.index === f.katakana[0]) {
          found = true;
          d.fishes.push(f);
        }
      });
      if (!found) {
        this.dictionary.push({ index: f.katakana[0], fishes: [f] });
        // Notion: Creating unique id with (i * -1).
        // It can be 0 if you don't care warning messages.
        // Unique id must be provided for FlatList keyExtractor.
        this.fish.push({ id: i * -1, header: true, name: f.katakana[0] });
      }
      f.header = false;
      this.fish.push(f);
    }
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
