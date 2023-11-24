import React from 'react'

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
    
    handleDisablePickupInStore
}) {
    // Function to handle the courier change
    const handleCourierChange = (event) => {
        handlerSetCourier(event.target.value); // Update the selected courier
        if (event.target.value !== "pickup") {
            handleDisablePickupInStore(false); // Disable "Pick Up In Store" if a shipping method is selected
        } else {
            handleDisablePickupInStore(true); // Enable "Pick Up In Store" if "Pick Up" is selected
        }
    };
    return (
        <div >
            <div
                className="calcongkir"
                style={{ position: "relative", top: "-5px", marginBottom: "5px" }}

            >
                <h2>Pilih Metode Pengiriman</h2>
                <div>

                    <select
                        value={courier}
                        onChange={handlerSetCourier}
                        className="methodDeliverySelect"
                        

                    >
                        <option className="methodDeliveryOption" value="jne">
                            jne
                        </option>
                        <option className="methodDeliveryOption" value="tiki">
                            tiki
                        </option>
                        <option className="methodDeliveryOption" value="pos">
                            pos
                        </option>
                        <option className="methodDeliveryOption" value="jnt">
                            jnt
                        </option>
                        <option className="methodDeliveryOption" value="lion">
                            lion parcel
                        </option>
                        <option className="methodDeliveryOption" value="sicepat">
                            sicepat
                        </option>
                    </select>
                    <select
                        name="province"
                        id="province"
                        onChange={handleProvinceChange}
                        className="methodDeliverySelect"
                        
                    >
                        <option className="methodDeliveryOption" value="">
                            Select Province
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
                            Select City
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
                            Select Subdistrict
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
                            <div key={index}>
                                <input
                                    type="radio"
                                    id={`shippingChoice${index}`}
                                    name="shipping"
                                    value={el.cost[0].value}
                                    checked={selectedShippingCost === el.cost[0].value}
                                    onChange={handleShippingCostChange}
                                    
                                />
                                <label htmlFor={`shippingChoice${index}`}>
                                    Shipping Cost: Rp.{el.cost[0].value}
                                </label>
                                <p>Service: {el.service}</p>
                                <p>Description: {el.description}</p>
                                <p>Est: {el.cost[0].etd} Days</p>
                            </div>
                        ))
                        : null}
                </div>
            </div>
        </div>
    )
}

export default ShippingMethod