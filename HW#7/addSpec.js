add = require("./add.js")

describe("Test for the add function", () => {

  it("return 0 if input is an empty string", () => {
    expect(add("")).toBe(0);
  });

  it("return 1 if input is \"1\"", () => {
    expect(add("1")).toBe(1);
  });

  it("return 1 if input is \"0,1\"", () => {
    expect(add("0,1")).toBe(1);
  });

  it("return 7 if input is \"2,7\"", () => {
    expect(add("2,7")).toBe(9);
  });

  it("return 6 if input is \"1,2,3\"", () => {
    expect(add("1,2,3")).toBe(6);
  });

  it("return 2 if input is \"1\\n0,1\"", () => {
    expect(add("1\n0,1")).toBe(2);
  });

  it("handle new lines between numbers", () =>
    {
      expect(add("1\n2,5")).toEqual(8)
      expect(add("1,2,3\n4")).toEqual(10)
    })

  it("Calling Add with a negative number will throw an exception", () => {
    expect(function(){add("-1,2")}).toThrow("negative numbers not allowed");
  });

  it("Numbers bigger than 1000 should be ignored", () =>
    {
      expect(add("2, 1001")).toEqual(2)
    })
});
