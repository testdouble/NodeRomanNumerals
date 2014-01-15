var mocha = require('mocha');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
var expect = chai.expect;
var sandbox = require('sandboxed-module');
var convertor = require('../lib/roman-numeral-convertor');

describe("Roman Numerals", function() {

  describe("Roman to Arabic Conversion", function() {
    it("returns 1 for I", function() {
      var result = convertor.toArabic("I");
      expect(result).to.equal(1);
    });

    it("returns 2 for II", function() {
      var result = convertor.toArabic("II");
      expect(result).to.equal(2);
    });

    it("returns 3 for III", function() {
      var result = convertor.toArabic("III");
      expect(result).to.equal(3);
    });

    it("returns 4 for IV", function() {
      var result = convertor.toArabic("IV");
      expect(result).to.equal(4);
    })

    it("returns 5 for V", function() {
      var result = convertor.toArabic("V");
      expect(result).to.equal(5);
    });

    it("returns 6 for VI", function() {
      var result = convertor.toArabic("VI");
      expect(result).to.equal(6);
    })

    it("returns 7 for VII", function() {
      var result = convertor.toArabic("VII");
      expect(result).to.equal(7);
    })

    it("returns 9 for IX", function() {
      var result = convertor.toArabic("IX");
      expect(result).to.equal(9);
    })

    it("converts superbowls XLVIII", function() {
      var result = convertor.toArabic("XLVIII");
      expect(result).to.equal(48);
    })
  });

  describe("Arabic to Roman Conversion", function() {
    var emailerStub;
    var mockedConvertor;

    beforeEach(function() {
      emailerStub = {email: sinon.stub().returns("Email sent successfully!")};
      mockedConvertor = sandbox.require('../lib/roman-numeral-convertor',
        {
          requires: {
            './emailer':emailerStub
          }
        });
    });

    afterEach(function() {
      emailerStub = {};
    });

    it("returns I for 1", function() {
      var result = mockedConvertor.toRoman(1, emailerStub);
      expect(result).to.equal("I");
    });

    it("returns II for 2", function() {
      var result = mockedConvertor.toRoman(2, emailerStub);
      expect(result).to.equal("II");
    });

    describe("Results Are Emailed", function() {
      it("emails todd@testdouble all results", function() {
        var result = mockedConvertor.toRoman(235);
        expect(emailerStub.email).to.have.been.calledWith(
          "todd@testdouble.com",
          sinon.match.string,
          sinon.match.string
        );
      })
      it("has a good subject", function() {
        var result = mockedConvertor.toRoman(235);
        expect(emailerStub.email).to.have.been.calledWith(
          sinon.match.string,
          "Roman Conversion",
          sinon.match.string
        );
      })
      it("has results in the body", function() {
        var result = mockedConvertor.toRoman(235);
        expect(emailerStub.email).to.have.been.calledWith(
          sinon.match.string,
          sinon.match.string,
          "Converting 235 to roman is I"
        );
      })
    })
  });

});