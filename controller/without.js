const withoutPassword = (data) => {
  {
    // console.log(data);
    const { passwordNew, confirmPassword, password, ...userWithoutPassword } =
      data._doc;

    return userWithoutPassword;
  }
};

module.exports = { withoutPassword };
