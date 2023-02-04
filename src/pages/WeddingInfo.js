import React from "react";
import EucalyptusHeader from "../components/eucalyptusHeader";
import HotelCard from "../components/hotelCard";
import "./WeddingInfo.css"
import placesToStay from "../placesToStay.json"
import TextBreak from "../components/textBreak";

function WeddingInfo({isEvening}) {

	function getCeremonyInfo() {
		return (
			<div>
				<EucalyptusHeader title="Ceremony" />
				<p>Ceremony to start at 13:00. Please aim to be there by 12:30 at the latest.</p>
				<p>Ceremony and Reception to all be held at Sopley Mill:</p>
			</div>
		);
	}

	function getReceptionInfo() {
		return (
			<div>
				<EucalyptusHeader title="Reception" />
				<p>Reception to start at 7pm.</p>
				<p>Reception to be held at Sopley Mill:</p>
			</div>
		);
	}

	function getDayFoodInfo() {
		return (
			<React.Fragment>
				<p>The ceremony will be followed by canapes and a selection of drinks: Pimm's, Beer and squash for the children</p>
				<p>If this doesn't tickle your fancy, the pay bar will also be open until the end of the night<span className="asterisk">*</span></p>
				<p>The wedding breakfast will follow shortly after canapes and photos, and there will a pizza bar in the evening.</p>
				<p>Please see the RSVP form where you can enter any dietary requirements you may have</p>
				<TextBreak></TextBreak>
				<p><span className="asterisk">*</span><i>Please note the bars are well stocked for anything you might like to drink. Please refrain from bringing your own alcohol or we'll have to pass the fine on to you</i></p>
			</React.Fragment>
		)
	}

	function getEveningFoodInfo() {
		return (
			<React.Fragment>
				<p>There will be a pay bar open all evening<span className="asterisk">*</span></p>
				<p>There will also be a pizza bar</p>
				<TextBreak></TextBreak>
				<p><span className="asterisk">*</span><i>Please note the bars are well stocked for anything you might like to drink. Please refrain from bringing your own alcohol or we'll have to pass the fine on to you</i></p>
			</React.Fragment>
		)
	}

    return (
        <div className="page">
				{isEvening ? getReceptionInfo() : getCeremonyInfo()}
				<div className="VenueInfo">
					<div className="AddressBox">
						<div className="AddressBoxBackground"></div>
						<div className="AddressParagraphs">
							<p>Sopley Mill</p>
							<p>Mill Lane</p>
							<p>Nr Christchurch</p>
							<p>Dorset</p>
							<p>BH23 7AU</p>
						</div>
					</div>
					<div className="MapBox">
						<iframe title="map" id="gmap_canvas" height="100%" width="100%" src="https://maps.google.com/maps?q=Sopley%20Mill,%20Mill%20Lane,%20Nr%20Christchurch,%20Dorset,%20BH23%207AU&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
					</div>
				</div>
				<p>To get there: Follow the A31 to Ringwood, then take the B3347 to Sopley</p>
				<EucalyptusHeader title="Parking" />
				<p>Sopley mill has a car park on site.</p>
				<p>You can leave your car overnight but make sure to pick it up by 11am the next day.</p>
				<p>Unfortunately camper vans are not allowed overnight.</p>
				<br/>
				<EucalyptusHeader title="Food and Drink" />
				{!isEvening && getDayFoodInfo()}
				{isEvening && getEveningFoodInfo()}
				<br />
				<EucalyptusHeader title="Where to stay" />
				<p>As Sopley Mill is on the edge of the New Forest, there is no shortage of places to stay in the area</p>
				<p>Some handy nearby hotels are:</p>
				<div className="hotelCards">
					{
					placesToStay.Hotels.map(x => {
						return <HotelCard
							linkUrl = {x.linkUrl}
							imageUrl = {x.imageUrl}
							name = {x.name}
							noOfMiles = {x.noOfMiles}
						/>
					})
					}
				</div>
				<p>There are also many campsites, including:</p>
				<div className="hotelCards">
				{
					placesToStay.Campsites.map(x => {
						return <HotelCard
							linkUrl = {x.linkUrl}
							imageUrl = {x.imageUrl}
							name = {x.name}
							noOfMiles = {x.noOfMiles}
						/>
					})
					}
				</div>
				<br />
				<EucalyptusHeader title="Gifts" />
				<p>We have lived together almost four years,<br/>And discovered Andy is a hoarder; Molly’s worst fear.<br/>So we’ve run out of space for anymore treasure,<br/>All we ask is that we celebrate together.</p>
				<p>If you wish to give a gift, to help us on our way,<br/>We’re saving for our honeymoon, somewhere far away.<br/>We know it’s not tradition, but we’d love a place to stay.<br/>But the greatest gift of all, would be seeing you on the day.</p>
				<br/>
				<br/>
			</div>
    )
}

export default WeddingInfo;