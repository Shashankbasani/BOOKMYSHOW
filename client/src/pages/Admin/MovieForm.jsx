import{ Modal, Form, Row, Col,Input, Select, Button} from 'antd'
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/skeleton/Title';
import { addMovie, GetMovies } from '../../API/movie';

function MovieForm({ismodel, setIsmodel, setMovies }){
    const handleOk = ()=>{
        setIsmodel(false);
    }
    const handleCancel = ()=>{
        setIsmodel(false);
    }
    const onFinish= async(values)=>{
         console.log(values)
         const res = await addMovie(values);
         console.log(res);
         if(res){
            const response = await GetMovies();
             const allMovies = response.data;
             setMovies(
            allMovies.map(i=>{
                return ({...JSON.parse(JSON.stringify(i)), key : i._id})
            })
        )
            setIsmodel(false);

         }
    }
    const handleChange= async(values)=>{
        console.log(values)
   }
    return(
        <Modal
        open={ismodel}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        >
          
          <Form
          layout='vertical'
          style={{width:"100%"}}
         // initialValues={SelectedMovies}
          onFinish={onFinish}
          >
            <Row
            gutter={{
                xs:6,
                sm:10,
                md:12,
                lg:16
            }}
            >
                <Col span={24}>
                <Form.Item
                label="Movie name"
                htmlFor='title'
                name='title'
                className='d-block'
                rules={[{required:true,message:"Movie name is required"}]}
                >
                    <Input id="title"
                    type="title"
                    placeholder="enter the movie name"
                    >
                    </Input>
                </Form.Item>
                </Col>
                <Col span={24}>
                <Form.Item
                label="Description"
                htmlFor='description'
                name='description' // u should give the correct name where u have given the name in db(Schema)
                className='d-block'
                rules={[{required:true,message:"description is required"}]}
                >
                    <TextArea id="description"
                    rows="4"
                    placeholder="enter the description"
                    >
                    </TextArea>
                </Form.Item>
                </Col>
                <Col span={24}>
                        <Row
                    gutter={{
                        xs:6,
                        sm:10,
                        md:12,
                        lg:16
                    }}
                    >
                        <Col span={8}>
                        <Form.Item
                            label="Movie duration in min"
                            htmlFor='duration'
                            name='duration'
                            className='d-block'
                            rules={[{required:true,message:"Movie duration is required"}]}
                                >
                            <Input id="duration"
                                type="duration"
                                placeholder="enter the movie duration"
                            >
                            </Input>
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                        <Form.Item
                            label="Select movie language"
                            htmlFor='language'
                            name='language'
                            className='d-block'
                            rules={[{required:true,message:"Movie language is required"}]}
                                >
                            <Select
                            id='language'
                            defaultValue='select language'
                            style={{width:"100%", height:"45px"}}
                            onChange={handleChange}
                            options={[
                               { value:"english", label:"englsih"},
                               { value:"hindi", label:"hindi"},
                               { value:"telugu", label:"telugu"},
                               { value:"marati", label:"marati"},
                               { value:"punjabi", label:"punjabi"},
                               { value:"bengali", label:"bengali"},
                            ]}
                            />
                            
                        </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            label="Release Date"
                            htmlFor='releaseDate'
                            name='releaseDate'
                            className='d-block'
                            rules={[{required:true,message:"Movie releaseDate is required"}]}
                            >
                                <Input id="releaseDate"
                                type="Date"
                                placeholder="choose the movie releaseDate"
                                >
                                </Input>
                            </Form.Item>
                         </Col>
                    </Row>
                </Col>
                <Col span={24}>
                <Row
                    gutter={{
                        xs:6,
                        sm:10,
                        md:12,
                        lg:16
                    }}
                    >
                        <Col span={8}>
                        <Form.Item
                            label="Select movie Genere"
                            htmlFor='genere'
                            name='genere'
                            className='d-block'
                            rules={[{required:true,message:"Movie genere is required"}]}
                                >
                            <Select
                            id='genere'
                            defaultValue='select genere'
                            style={{width:"100%"}}
                            onChange={handleChange}
                            options={[
                               { value:"Action", label:"Action"},
                               { value:"Comedy", label:"comedy"},
                               { value:"Horror", label:"Horror"},
                               { value:"Love", label:"Love"},
                               { value:"Batkti", label:"Batkti"},
                               { value:"Thriller", label:"Thriller"},
                               { value:"SCI-fi", label:"sci-fi"}
                            ]}
                            />
                            
                        </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item
                            label="Poster URL"
                            htmlFor='poster'
                            name='poster'
                            className='d-block'
                            rules={[{required:true,message:"Movie poster is required"}]}
                            >
                                <Input id="poster"
                                type="text"
                                placeholder="enter the movie poster URL"
                                >
                                </Input>
                            </Form.Item>
                         </Col>
                    </Row>
                </Col>
            </Row>
             <Form.Item>
                <Button 
                block
                type='primary'
                htmlType='submit'
                style={{fontSize:"1rem", fontWeight:"600"}}
                >
                    Submit the Data
                </Button>
                <Button className='mt-3' block onClick={()=>{setIsmodel(false)}}>
                    Cancel
                </Button>
             </Form.Item>
          </Form>
        </Modal>
    )
}

export default MovieForm;