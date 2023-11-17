import React from "react";

function ShippingMethod({
  courier,
  handlerSetCourier,
  handleProvinceChange,
  province,
  handleCityChange,
  city,
  handlerGetCost,
  subdistrict,
  pengiriman,
  selectedShippingCost,
  handleShippingCostChange,
}) {
  return (
      <div>
        <h3 className="pilihShip">Pilih Metode Pengiriman</h3>
        <select
          value={courier}
          onChange={handlerSetCourier}
          className="methodDeliverySelect"
        >
          <option className="methodDeliveryOption" value="jne">
            JNE
          </option>
          <option className="methodDeliveryOption" value="tiki">
            TIKI
          </option>
          <option className="methodDeliveryOption" value="pos">
            JNT
          </option>
          <option className="methodDeliveryOption" value="jnt">
            LION PARCEL
          </option>
          <option className="methodDeliveryOption" value="jnt">
            SICEPAT
          </option>
        </select>
        <select
          name="province"
          id="province"
          onChange={handleProvinceChange}
          className="methodDeliverySelect"
        >
          <option className="methodDeliveryOption" value="">
            Pilih Provinsi
          </option>
          {province.map((item) => (
            <option
              className="methodDeliveryOption"
              key={item.province_id}
              value={item.province_id}
            >
              {item.province}
            </option>
          ))}
        </select>
        <select
          name="city"
          id="city"
          onChange={handleCityChange}
          className="methodDeliverySelect"
        >
          <option className="methodDeliveryOption" value="">
            Pilih Kota / Kabupaten
          </option>
          {Array.isArray(city) &&
            city.map((item) => (
              <option
                className="methodDeliveryOption"
                key={item.city_id}
                value={item.city_id}
              >
                {item.city_name}
              </option>
            ))}
        </select>
        <select
          name="subdistrict"
          id="subdistrict"
          onChange={handlerGetCost}
          className="methodDeliverySelect"
        >
          <option className="methodDeliveryOption" value="">
            Pilih Kecamatan
          </option>
          {Array.isArray(subdistrict) &&
            subdistrict.map((item) => (
              <option
                className="methodDeliveryOption"
                key={item.subdistrict_id}
                value={item.subdistrict_id}
              >
                {item.subdistrict_name}
              </option>
            ))}
        </select>
        {pengiriman
          ? pengiriman.map((el, index) => (
              <div className="ShippingCost" key={index}>
                <input
                  type="radio"
                  id={`shippingChoice${index}`}
                  name="shipping"
                  value={el.cost[0].value}
                  checked={selectedShippingCost === el.cost[0].value}
                  onChange={handleShippingCostChange}
                />
                <label htmlFor={`shippingChoice${index}`}>
                  Ongkos kirim : Rp.
                  {el.cost[0].value.toLocaleString("id-ID", {})}
                </label>
                <p>Layanan : {el.service}</p>
                <p>Deskripsi : {el.description}</p>
                <p>Estimasi : {el.cost[0].etd} hari</p>
              </div>
            ))
          : null}
      </div>
  );
}

export default ShippingMethod;