import styled from "styled-components";

const CommentCard = () => {
  return (
    <Comment>
      <img src="/image/iconEmptyCheck.png" />

      <CommentText>
        <div className="first">
          제 일도 아닌데 너무 억울하네요.제 일도 아닌데 너무 억울하네요.제 일도
          아닌데 너무 억울하네요.
        </div>

        <CommentInfo>
          <div>01-20 16:43</div>
          <img src="/image/iconRedHeart.png" />
          <div>1</div>
        </CommentInfo>

        <div>다들 그래...?</div>
      </CommentText>
    </Comment>
  );
};

const Comment = styled.div`
  width: 100%;
  height: 94px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  padding: 0px 15px 15px 15px;
  margin-bottom: 15px;

  img {
    width: 15px;
    height: 15px;
    margin-right: 15px;
  }
`;

const CommentText = styled.div`
  width: 315px;
  font-size: 13px;
  font-weight: 400px;

  .first {
    height: 39px;
    line-height: 150%;
    margin-top: -3px;
  }
  div:nth-child(2) {
    margin: 5px 0px 5px 0px;
  }
  div:last-child {
    color: #aeaeae;
  }
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  color: #aeaeae;

  div {
    margin-right: 10px;
  }
  img {
    width: 13px;
    height: 13px;
    margin-right: 3px;
  }
`;

export default CommentCard;
