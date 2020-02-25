import { diskStorage } from 'multer';
import { resolve, extname } from 'path';
import { randomBytes } from 'crypto';

export default {
  storage: diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      randomBytes(16, (err, bytes) => {
        if (err) cb(err);

        const filename = bytes.toString('hex') + extname(file.originalname);

        return cb(null, filename);
      });
    },
  }),
};
