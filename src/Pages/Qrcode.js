import React from 'react';
import Qrcode from 'qrcode.react';


export const QQrcode = () => {
  return (
    <div>
      <Qrcode
        value={"data:image/png;base64"}
        size={128}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
        renderAs={"svg"}
      />
    </div>
  );
};
