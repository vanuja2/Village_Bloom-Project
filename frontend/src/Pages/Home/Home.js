import React from 'react'
import Nav from '../../Components/NavBar/Nav';
import Card1 from './img/cardone.jpg'
import Card2 from './img/cardttwo.png'
import Card3 from './img/cardthre.png'
import Card4 from './img/card4.png'
import Card5 from './img/card5.png'
import Card6 from './img/card6.png'
import CatCard1 from './img/Handcrafts.jpg'
import CatCard2 from './img/Ecofriendlyitems.png'
import CatCard3 from './img/Ayurvedicproducts.png'
import CatCard4 from './img/Organic foods.png'
function Home() {
  return (
    <div>
      <Nav />
      <div className='full_with_con'>
        <div className='continer'>
          <div className='hero_full_path'>
            <div className='hero_full_path_section'>
              <div className='left_continer_hero'>
                <p className='left_continer_hero_topic'> Welcome to, <span className='main_topicc'>VillageBoom!</span></p>
                <p className='left_continer_hero_pera'>Empowering rural artisans by connecting their handmade products with the world. Discover unique crafts, support local talent, and help villages thrive—one sale at a time!</p>
                <button className='left_continer_hero_btn'>Shop Now</button>
              </div>
            </div>
            <div className='hero_full_path_section'>
              <div className='right_continer_hero_con'>
                <div className='right_continer_hero'>
                  <img src={Card1} alt='imgcard' className='card_hero_img' />
                  <img src={Card5} alt='imgcard' className='card_hero_img' />
                </div>

                <div className='right_continer_hero'>
                  <img src={Card6} alt='imgcard' className='card_hero_img' />
                  <img src={Card2} alt='imgcard' className='card_hero_img' />
                </div>
                <div className='right_continer_hero'>
                  <img src={Card3} alt='imgcard' className='card_hero_img' />
                  <img src={Card4} alt='imgcard' className='card_hero_img' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='full_continer'>
        <div className='continer'>
          <div className='sub_continer'>
            <div className='why_use_con'>
              <div className='why_use_card'>
                <div className='why_use_card_section'>
                  <p className='why_use_card_section_topic'>Connecting<br /> Villages to the World</p>
                  <p className='why_use_card_section_pera'>Together, we’re rewriting Sri Lanka’s rural economy – one artisan, one harvest, and one tradition at a time</p>
                </div>
                <div className='why_use_card_section'>
                  <div className='why_card_number_col'>
                    <div className='why_use_card_section_cardnum'>
                      <p className='card_num'>800+</p>
                      <p className='card_pera'>Artisans Empowered</p>
                    </div>
                    <div className='why_use_card_section_cardnum'>
                      <p className='card_num'>600+</p>
                      <p className='card_pera'>Organic Farms Supported</p>
                    </div>
                    <div className='why_use_card_section_cardnum'>
                      <p className='card_num'>900+</p>
                      <p className='card_pera'>Best Product Reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='product_cat'>
              <p className='product_cat_topic'>
              VillageBoom Brings<br/> You Earth’s Purest Gifts
              </p>
              <div className='product_cat_card_con'>
                <div className='product_cat_card'>
                  <img src={CatCard1} alt='imgcard' className='product_cat_card_img' />
                  <p className='product_cat_card_topic'>Celebrate Heritage, Own a Piece of Art</p>
                  <p className='product_cat_card_pera'>"Discover exquisite handmade crafts by rural artisans—from pottery to textiles. Each purchase supports traditional skills and boosts village livelihoods."</p>
                </div>
                <div className='product_cat_card'>
                  <img src={CatCard4} alt='imgcard' className='product_cat_card_img' />
                  <p className='product_cat_card_topic'>From Our Fields to Your Table</p>
                  <p className='product_cat_card_pera'>"Pure, chemical-free organic foods straight from village farms. Shop fresh grains, spices, honey, and more—grown with care for you and the planet."</p>
                </div>
                <div className='product_cat_card'>
                  <img src={CatCard3} alt='imgcard' className='product_cat_card_img' />
                  <p className='product_cat_card_topic'>Nature’s Wisdom, Delivered to You</p>
                  <p className='product_cat_card_pera'>"Sustainable products for a healthier life! Ayurvedic remedies, endemic plants, and eco-friendly alternatives—all ethically sourced from rural ecosystems."</p>
                </div>
                <div className='product_cat_card'>
                  <img src={CatCard2} alt='imgcard' className='product_cat_card_img' />
                  <p className='product_cat_card_topic'>Sustainable Living, Rooted in Tradition</p>
                  <p className='product_cat_card_pera'>"Go green with eco-friendly treasures! Biodegradable utensils, natural fiber bags, and more—handcrafted sustainably to reduce waste and support artisans."</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <footer className='footer'>
              <p>Copyright 2025 © VillageBoom. All rights reserved.</p>

            </footer>
    </div>
  )
}

export default Home
