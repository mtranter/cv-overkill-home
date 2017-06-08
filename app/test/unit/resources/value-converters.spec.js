import { GroupsValueConverter } from './../../../src/resources/value-converters/sort.js'

describe('GroupsValueConverter', () => {
  let gvc = new GroupsValueConverter();
  describe('#toValue', () => {
    it('should split an even array equally', () => {
      let testArray = [1,2,3,4,5,6,7,8];
      let retval = gvc.toView(testArray, 2);
      expect(retval.length).toBe(2);
      expect(retval[0]).toEqual([1,2,3,4]);
      expect(retval[1]).toEqual([5,6,7,8]);
    });
    it('should split an odd array correctly', () => {
      let testArray = [1,2,3,4,5,6,7];
      let retval = gvc.toView(testArray, 2);
      expect(retval.length).toBe(2);
      expect(retval[0]).toEqual([1,2,3,4]);
      expect(retval[1]).toEqual([5,6,7]);
    });
    it('should split an odd array evenly', () => {
      let testArray = [1,2,3,4,5,6,7,8,9];
      let retval = gvc.toView(testArray, 3);
      expect(retval.length).toBe(3);
      expect(retval[0]).toEqual([1,2,3]);
      expect(retval[1]).toEqual([4,5,6]);
      expect(retval[2]).toEqual([7,8,9]);
    })
  })
})
