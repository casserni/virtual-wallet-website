import ConversionTable from '../src/components/ConversionTable';
import { getExchangeRates } from '../src/data.js';

describe('ConversionTable', () => {
  let wrapper;

  beforeEach(() => {
    spyOn(global, 'fetch').and.returnValue(
      createResponseFromFixture('days/dayIndex');
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('visiting the homepage', () => {
    beforeEach(() => {
      wrapper = mount(
        <ConversionTable getExchangeRates={getExchangeRates}/>
      );
    });

    it('has the current exchange rates for USD', done => {
      setTimeout(() => {
        let pageText = wrapper.text();
        expect(pageText).toContain('AUD: 1.313 0.176%');
        expect(pageText).not.toContain('AUD: 1.3102');
        done();
      },0);
    });
  });
});
