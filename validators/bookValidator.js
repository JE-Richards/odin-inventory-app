const { body } = require('express-validator');

const emptyErr = 'must not be empty.';
const len255Err = 'must be less than 255 characters.';
const len2048Err = 'must not exceed 2048 characters.';
const len3000Err = 'must be less than 3,000 characters.';
const urlErr = 'must be a valid URL.';
const imgFormatErr = 'must point to a valid image (jpg, jpeg, png, or gif).';

const validateNewBook = [
  body('bookTitle')
    .trim()
    .notEmpty()
    .withMessage(`Book title ${emptyErr}`)
    .isLength({ max: 255 })
    .withMessage(`Book title ${len255Err}`),
  body('authorFirstName')
    .trim()
    .notEmpty()
    .withMessage(`Author's first name ${emptyErr}`)
    .isLength({ max: 255 })
    .withMessage(`Author's first name ${len255Err}`),
  body('authorLastName')
    .trim()
    .notEmpty()
    .withMessage(`Author's last name ${emptyErr}`)
    .isLength({ max: 255 })
    .withMessage(`Author's last name ${len255Err}`),
  body('bookGenre')
    .trim()
    .notEmpty()
    .withMessage(`Book's genre ${emptyErr}`)
    .isLength({ max: 255 })
    .withMessage(`Book's genre ${len255Err}`),
  body('bookDescription')
    .optional()
    .trim()
    .isLength({ max: 3000 })
    .withMessage(`Books description ${len3000Err}`),
  body('bookCoverImgURL')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage(`The cover image URL ${urlErr}`)
    .matches(/\.(jpg|jpeg|png|gif)$/i)
    .withMessage(`The cover image URL ${imgFormatErr}`)
    .isLength({ max: 2048 })
    .withMessage(`The cover image URL ${len2048Err}`),
  body('bookPublisher')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage(`Books publisher ${len255Err}`),
];

module.exports = validateNewBook;
